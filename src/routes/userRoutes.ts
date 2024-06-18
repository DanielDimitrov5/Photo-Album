import express, { Router } from 'express';
import UserController from '../controllers/userController';
import UserMailService from '../services/userMailService';
import CommentService from '../services/commentService';
import { isGuest, isLoggedIn, isAdmin } from '../middlewares/auth/authMiddlewares';
import { MailConfig } from '../config/emailConfig';

const userRouter: Router = express.Router();

const mailConfig = new MailConfig();

const userService = new UserMailService(mailConfig);
const commentService = new CommentService();

const userController = new UserController(userService, commentService);

// Route to get all users
userRouter.get('/', userController.users);

// Routes for user registration
userRouter.get('/register', isGuest, userController.registerGET)
userRouter.post('/register', isGuest, userController.registerPOST);

// Routes for user login
userRouter.get('/login', isGuest, userController.loginGET);
userRouter.post('/login', isGuest, userController.loginPOST);

// Route for user logout
userRouter.get('/logout', userController.logout);

// Routes for sending and receiving messages
userRouter.get('/message', isLoggedIn, userController.messageGET);
userRouter.post('/message', isLoggedIn ,userController.messagePOST);

// Route to delete a comment (only accessible by admin)
userRouter.post('/comment-delete/:id', isAdmin, userController.deleteComment);

// Route to delete a user (only accessible by admin)
userRouter.post('/user-delete/:id', isAdmin, userController.deleteUser);

export default userRouter;
