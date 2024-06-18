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
        // Create instances of the required services and controller
        const photoService = new PhotoService();
        const commentService = new CommentService();
        const photoController = new PhotoController(photoService, commentService, this.io);
    
        // Configure the routes
        this.router.get('/', photoController.photos); // Route to get all photos
    
        this.router.get('/user/:id', isAdmin, photoController.photosUser); // Route to get photos by user ID, accessible only to admins
    
        this.router.get('/add', isLoggedIn, photoController.addPhotoGET); // Route to render the add photo form, accessible only to logged-in users
        this.router.post('/add', isLoggedIn, photoController.addPhotoPOST); // Route to handle the submission of the add photo form, accessible only to logged-in users
    
        this.router.get('/:id', photoController.singlePhoto); // Route to get a single photo by ID
    
        this.router.post('/delete/:id', isLoggedIn, photoController.deletePhoto); // Route to delete a photo by ID, accessible only to logged-in users
    }

    public getRouter(): Router {
        return this.router;
    }
}
