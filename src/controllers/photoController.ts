import { Request, Response } from "express";
import { IPhotoService } from "../interfaces/photos/IPhotoService";
import { ICommentService } from "../interfaces/comments/ICommentServices";
import { CustomSession } from "../interfaces/users/ISession";

export class PhotoController {
    photoService: IPhotoService;
    commentService: ICommentService;

    constructor(photoService: IPhotoService, commentService: ICommentService) {
        this.photoService = photoService;
        this.commentService = commentService;
    }

    photos = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;

        const { totalPhotos, photos } = await this.photoService.getPhotos(page, limit);
        const totalPages = Math.ceil(totalPhotos / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.render('photos', { photos, page, totalPages, hasNextPage, hasPrevPage });
    };

    photosUser = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;
        const userId = parseInt(req.params.id);

        const { totalPhotos, photos } = await this.photoService.getPhotos(page, limit, userId);
        const totalPages = Math.ceil(totalPhotos / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        res.render('photos', { photos, page, totalPages, hasNextPage, hasPrevPage });
    }

    addPhotoGET = async (req: Request, res: Response) => {
        res.render('addPhoto');
    }

    addPhotoPOST = async (req: Request & { session: CustomSession }, res: Response) => {
        const { title, description, url } = req.body;
        const userId = req.session.userId ?? 0;

        try {
            await this.photoService.addPhoto(title, description, url, userId);
            res.redirect('/photos');
        } catch (error: any) {
            console.error('Error adding photo:', error);
            res.status(500).send(`Error adding photo: ${error.message}`);            
        }
    }

    singlePhoto = async (req: Request & { session: CustomSession }, res: Response) => {
        const id = parseInt(req.params.id);
        const userId = req.session.userId;
        try {
            const photo = await this.photoService.getPhoto(id);
            const isOwner = userId && await this.photoService.isOwner(userId, id);
            const isAdmin = req.session.isAdmin;
            const comments = await this.commentService.getComments(id);

            res.render('photo', { photo, isOwner, comments, isAdmin});
        } catch (error) {
            console.error('Error fetching photo:', error);
            res.status(500).send('An error occurred.');
        }
    };

    deletePhoto = async (req: Request & { session: CustomSession }, res: Response) => {
        const id = parseInt(req.params.id);

        const userId = req.session.userId ?? 0;

        try {
            await this.photoService.deletePhoto(id, userId);
            
            res.redirect('/photos');
        } catch (error: any) {
            console.error('Error deleting a photo:', error);
            res.status(500).send(`Error adding a photo: ${error.message}`);
        }
    }
}