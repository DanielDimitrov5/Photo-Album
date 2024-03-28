import { Router } from "express";
import PhotoController from "../controllers/photoController";
import PhotoService from "../services/photoService";
import CommentService from "../services/commentService";
import { isLoggedIn, isAdmin } from "../middlewares/auth/authMiddlewares";
import { Server as SocketIOServer } from "socket.io";

export default class PhotoRouterConfig {
    private router: Router;
    private io: SocketIOServer;

    constructor(io: SocketIOServer) {
        this.router = Router();
        this.io = io;
        this.configure();
    }

    private configure() {
        const photoService = new PhotoService();
        const commentService = new CommentService();
        const photoController = new PhotoController(photoService, commentService, this.io);
    
        this.router.get('/', photoController.photos);
    
        this.router.get('/user/:id', isAdmin, photoController.photosUser);
    
        this.router.get('/add', isLoggedIn, photoController.addPhotoGET);
        this.router.post('/add', isLoggedIn, photoController.addPhotoPOST);
    
        this.router.get('/:id', photoController.singlePhoto);
        this.router.post('/delete/:id', isLoggedIn, photoController.deletePhoto);
    }

    public getRouter(): Router {
        return this.router;
    }
}
