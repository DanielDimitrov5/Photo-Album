import express, { Router, Request, Response } from "express";
import { IndexController } from "../controllers/indexController";
import { PhotoService } from "../services/photoService";
import { UserService } from "../services/userService";
import { MailConfig } from "../config/emailConfig";
import { CustomSession } from "../interfaces/users/ISession";

const commentRouter: Router = express.Router();

const mailConfig = new MailConfig();
const photoService = new PhotoService();
const userService = new UserService(mailConfig);

const indexController = new IndexController(photoService, userService);

commentRouter.get('/', async (req: Request & { session: CustomSession }, res: Response) => {
    if (req.session.userId && req.session.isAdmin) {
        console.log('admin');
        await indexController.homeAdmin(req, res);
        return;
    }

    console.log('not admin');
    await indexController.home(req, res);
});

export default commentRouter;
