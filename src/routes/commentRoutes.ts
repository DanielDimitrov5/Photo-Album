import express, { Router } from "express";
import { isLoggedIn } from "../middlewares/auth/authMiddlewares";
import { CommentController } from "../controllers/commentController";
import { CommentService } from "../services/commentService";

const commentRouter: Router = express.Router();

const commentService = new CommentService();
const commentController = new CommentController(commentService);

commentRouter.post('/add', isLoggedIn, commentController.addComment);
commentRouter.post('/delete', isLoggedIn, commentController.deleteComment);


export default commentRouter;