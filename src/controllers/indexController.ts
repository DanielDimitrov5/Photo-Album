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

    home = async (req: RequestSession, res: Response) => {
        const photos = await this.photoService.getPhotos(1, 9);

        res.render('index', { photos: photos.photos });
    }

    homeAdmin = async (req: RequestSession, res: Response) => {
        const photos = await this.photoService.getPhotos(1, 5);
        const users = await this.userService.getLastUsers(5);

        res.render('indexAdmin', { photos: photos.photos, users: users});
    }
}