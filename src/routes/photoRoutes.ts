import express, { Router } from "express";
import { PhotoController } from "../controllers/photoController";
import { PhotoService } from "../services/photoService";
import { CommentService } from "../services/commentService";
import { isLoggedIn, isAdmin } from "../middlewares/auth/authMiddlewares";

const photoRouter: Router = express.Router();

const photoService = new PhotoService();
const commentService = new CommentService();

const photoController = new PhotoController(photoService, commentService);

photoRouter.get('/', photoController.photos);

photoRouter.get('/user/:id', isAdmin, photoController.photosUser);

photoRouter.get('/add', isLoggedIn, photoController.addPhotoGET);
photoRouter.post('/add', isLoggedIn, photoController.addPhotoPOST);

photoRouter.get('/:id', photoController.singlePhoto);
photoRouter.post('/delete/:id', isLoggedIn, photoController.deletePhoto);

export default photoRouter;
