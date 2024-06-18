import express, { Router, Request, Response } from "express";
import IndexController from "../controllers/indexController";
import PhotoService from "../services/photoService";
import UserService from "../services/userService";
import { RequestSession } from "../interfaces/users/ISession";

// Create a new router instance
const commentRouter: Router = express.Router();

// Create instances of the photo service and user service
const photoService = new PhotoService();
const userService = new UserService();

// Create an instance of the index controller, passing in the photo service and user service
const indexController = new IndexController(photoService, userService);

// Define a route for the home page
commentRouter.get('/', async (req: RequestSession, res: Response) => {
    // Check if the user is logged in and is an admin
    if (req.session.userId && req.session.isAdmin) {
        // If the user is an admin, call the homeAdmin method of the index controller
        await indexController.homeAdmin(req, res);
        return;
    }

    // If the user is not an admin, call the home method of the index controller
    await indexController.home(req, res);
});

// Export the commentRouter
export default commentRouter;
