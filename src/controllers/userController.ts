import { Request, Response } from 'express';
import { CustomSession } from '../interfaces/users/ISession';
import { IUserService } from '../interfaces/users/IUserService';
import { ICommentService } from '../interfaces/comments/ICommentServices';

export class UserController {
    userService: IUserService;
    commentService: ICommentService;

    constructor(userService: IUserService, commentService: ICommentService) {
        this.userService = userService;
        this.commentService = commentService;
    }

    registerGET = (req: Request, res: Response) => {
        res.render('register');
    };

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
    
    loginGET = (req: Request, res: Response) => {
        res.render('login');
    }

    loginPOST = async (req: Request & { session: CustomSession }, res: Response) => {
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

    logout = (req: Request & { session: CustomSession }, res: Response) => {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
            }
            res.redirect('/');
        });
    }

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

    messageGET = (req: Request, res: Response) => {
        res.render('message');
    }

    messagePOST = async (req: Request & { session: CustomSession }, res: Response) => {
        const { title, content } = req.body;
        if (!req.session.userId) {
            res.redirect('/users/login');
            return;
        }
        
        const userId = req.session.userId as number;

        await this.userService.sendMessage(userId, title, content);
        res.status(200).send('Message sent!');
    }

    deleteComment = async (req: Request & { session: CustomSession }, res: Response) => {
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

    deleteUser = async (req: Request & { session: CustomSession }, res: Response) => {
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
