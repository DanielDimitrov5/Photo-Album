import { Request, Response } from 'express';
import { RequestSession } from '../interfaces/users/ISession';
import { ICommentService } from '../interfaces/comments/ICommentServices';
import { IUserMailService } from '../interfaces/users/IUserService';

export default class UserController {
    userService: IUserMailService;
    commentService: ICommentService;

    constructor(userService: IUserMailService, commentService: ICommentService) {
        this.userService = userService;
        this.commentService = commentService;
    }

    // Renders the register page
    registerGET = (req: Request, res: Response) => {
        res.render('register');
    };

    // Handles the registration form submission
    registerPOST = async (req: Request, res: Response) => {
        const { username, password } = req.body;

        const user = await this.userService.findUserByUsername(username);

        if (user) {
            res.status(400).send('Username is already taken');
            return;
        }

        try {
            await this.userService.createUser(username, password);
            res.redirect('login');
        } catch (error) {
            res.status(400).send(`Error creating user: ${error}`);
        }
    };
    
    // Renders the login page
    loginGET = (req: Request, res: Response) => {
        res.render('login');
    }

    // Handles the login form submission
    loginPOST = async (req: RequestSession, res: Response) => {
        const { username, password } = req.body;
        const isValid = await this.userService.verifyUser(username, password);

        if (!isValid) {
            return res.render('login');
        }

        req.session.username = username;
        const user = await this.userService.findUserByUsername(username);
        if (user) {
            req.session.userId = user.id;
            req.session.isAdmin = user.isAdmin;
        }

        res.redirect('/');
    };

    // Handles the logout request
    logout = (req: RequestSession, res: Response) => {
        req.session.destroy((err: any) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/');
        });
    }

    // Renders the users page with pagination
    users = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string, 10) || 1;
        const limit = parseInt(req.query.limit as string, 10) || 9;

        try {
            const { users, totalPages } = await this.userService.getUsersWithPhotoCount(page, limit);

            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            res.render('users', {
                users,
                totalPages,
                hasPrevPage,
                hasNextPage,
                currentPage: page,
            });
        } catch (error: any) {
            console.error('Error fetching users:', error);
            res.status(500).send(`Error fetching users: ${error.message}`);
        }
    };

    // Renders the message page
    messageGET = (req: Request, res: Response) => {
        res.render('message');
    }

    // Handles the message form submission
    messagePOST = async (req: RequestSession, res: Response) => {
        const { title, content } = req.body;
        if (!req.session.userId) {
            res.redirect('/users/login');
            return;
        }
        
        const userId = req.session.userId as number;

        await this.userService.sendMessage(userId, title, content);
        res.status(200).send('Message sent!');
    }

    // Deletes a comment
    deleteComment = async (req: RequestSession, res: Response) => {
        const commentId = parseInt(req.params.id, 10);
        const userId = req.session.userId as number;

        try {
            await this.commentService.deleteComment(commentId, userId);
            res.redirect('back');
        } catch (error: any) {
            console.error('Error deleting comment:', error);
            res.status(500).send(`Error deleting comment: ${error.message}`);
        }
    }

    // Deletes a user
    deleteUser = async (req: RequestSession, res: Response) => {
        const userId = parseInt(req.params.id, 10);
        const currentUserId = req.session.userId as number;

        try {
            await this.userService.deleteUser(userId, currentUserId);
            res.redirect('back');
        } catch (error: any) {
            console.error('Error deleting user:', error);
            res.status(500).send(`Error deleting user: ${error.message}`);
        }
    }
}
