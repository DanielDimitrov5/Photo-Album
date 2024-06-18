import express, { Router } from "express";
import { isLoggedIn } from "../middlewares/auth/authMiddlewares";
import CommentController from "../controllers/commentController";
import CommentService from "../services/commentService";

// Create a new router instance
const commentRouter: Router = express.Router();

// Create instances of CommentService and CommentController
const commentService = new CommentService();
const commentController = new CommentController(commentService);

// Define routes and attach middleware and controller methods
commentRouter.post('/add', isLoggedIn, commentController.addComment);
commentRouter.post('/delete', isLoggedIn, commentController.deleteComment);

// Export the router instance
export default commentRouter;
