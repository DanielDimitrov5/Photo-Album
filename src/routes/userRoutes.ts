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

userRouter.get('/', userController.users);

userRouter.get('/register', isGuest, userController.registerGET)
userRouter.post('/register', isGuest, userController.registerPOST);

userRouter.get('/login', isGuest, userController.loginGET);
userRouter.post('/login', isGuest, userController.loginPOST);

userRouter.get('/logout', userController.logout);

userRouter.get('/message', isLoggedIn, userController.messageGET);
userRouter.post('/message', isLoggedIn ,userController.messagePOST);

userRouter.post('/comment-delete/:id', isAdmin, userController.deleteComment);
userRouter.post('/user-delete/:id', isAdmin, userController.deleteUser);

export default userRouter;
