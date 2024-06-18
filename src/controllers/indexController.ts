import { Response } from "express";
import { IPhotoService } from "../interfaces/photos/IPhotoService";
import { IUserService } from "../interfaces/users/IUserService";
import { RequestSession } from "../interfaces/users/ISession";

export default class IndexController {
    photoService: IPhotoService;
    userService: IUserService;

    constructor(photoService: IPhotoService, userService: IUserService) {
        this.photoService = photoService;
        this.userService = userService;
    }

    // Handler for the home route
    home = async (req: RequestSession, res: Response) => {
        // Get photos from the photo service
        const photos = await this.photoService.getPhotos(1, 9);

        // Render the 'index' view and pass the photos as data
        res.render('index', { photos: photos.photos });
    }

    // Handler for the homeAdmin route
    homeAdmin = async (req: RequestSession, res: Response) => {
        // Get photos from the photo service
        const photos = await this.photoService.getPhotos(1, 5);
        
        // Get last 5 users from the user service
        const users = await this.userService.getLastUsers(5);

        // Render the 'indexAdmin' view and pass the photos and users as data
        res.render('indexAdmin', { photos: photos.photos, users: users});
    }
}