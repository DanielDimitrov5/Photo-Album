import express, { Router, Request, Response } from "express";
import IndexController from "../controllers/indexController";
import PhotoService from "../services/photoService";
import UserService from "../services/userService";
import { RequestSession } from "../interfaces/users/ISession";

const commentRouter: Router = express.Router();

const photoService = new PhotoService();
const userService = new UserService();

const indexController = new IndexController(photoService, userService);

commentRouter.get('/', async (req: RequestSession, res: Response) => {
    if (req.session.userId && req.session.isAdmin) {
        await indexController.homeAdmin(req, res);
        return;
    }

    await indexController.home(req, res);
});

export default commentRouter;
