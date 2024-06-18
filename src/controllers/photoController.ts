import { Request, Response } from "express";
import { IPhotoService } from "../interfaces/photos/IPhotoService";
import { ICommentService } from "../interfaces/comments/ICommentServices";
import { RequestSession } from "../interfaces/users/ISession";
import { Server as SocketIOServer } from 'socket.io';

export default class PhotoController {
    photoService: IPhotoService;
    commentService: ICommentService;
    io: SocketIOServer;

    constructor(photoService: IPhotoService, commentService: ICommentService, io: SocketIOServer) {
        this.photoService = photoService;
        this.commentService = commentService;
        this.io = io;
    }

    // Handler for rendering all photos
    photos = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;

        // Get photos and total count from the photo service
        const { totalPhotos, photos } = await this.photoService.getPhotos(page, limit);
        const totalPages = Math.ceil(totalPhotos / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        // Render the 'photos' view with the retrieved data
        res.render('photos', { photos, page, totalPages, hasNextPage, hasPrevPage });
    };

    // Handler for rendering photos by a specific user
    photosUser = async (req: Request, res: Response) => {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 9;
        const userId = parseInt(req.params.id);

        // Get photos and total count for the specified user from the photo service
        const { totalPhotos, photos } = await this.photoService.getPhotos(page, limit, userId);
        const totalPages = Math.ceil(totalPhotos / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;

        // Render the 'photos' view with the retrieved data
        res.render('photos', { photos, page, totalPages, hasNextPage, hasPrevPage });
    }

    // Handler for rendering the 'addPhoto' view
    addPhotoGET = async (req: Request, res: Response) => {
        res.render('addPhoto');
    }

    // Handler for adding a new photo
    addPhotoPOST = async (req: RequestSession, res: Response) => {
        const { title, description, url } = req.body;
        const userId = req.session.userId ?? 0;

        try {
            // Add the photo using the photo service
            const photoId = await this.photoService.addPhoto(title, description, url, userId);

            // Emit a 'photoAdded' event using Socket.IO
            this.io.emit('photoAdded', { title, description, url, photoId });

            // Redirect to the 'photos' page
            res.redirect('/photos');
        } catch (error: any) {
            console.error('Error adding photo:', error);
            res.status(500).send(`Error adding photo: ${error.message}`);
        }
    }

    // Handler for rendering a single photo
    singlePhoto = async (req: RequestSession, res: Response) => {
        const id = parseInt(req.params.id);
        const userId = req.session.userId;

        try {
            // Get the photo details from the photo service
            const photo = await this.photoService.getPhoto(id);

            // Check if the current user is the owner of the photo
            const isOwner = userId && await this.photoService.isOwner(userId, id);

            // Check if the current user is an admin
            const isAdmin = req.session.isAdmin;

            // Get the comments for the photo
            const comments = await this.commentService.getComments(id);

            // Render the 'photo' view with the retrieved data
            res.render('photo', { photo, isOwner, comments, isAdmin });
        } catch (error) {
            console.error('Error fetching photo:', error);
            res.status(500).send('An error occurred.');
        }
    };

    // Handler for deleting a photo
    deletePhoto = async (req: RequestSession, res: Response) => {
        const id = parseInt(req.params.id);
        const userId = req.session.userId ?? 0;

        try {
            // Delete the photo using the photo service
            await this.photoService.deletePhoto(id, userId);

            // Redirect to the 'photos' page
            res.redirect('/photos');
        } catch (error: any) {
            console.error('Error deleting a photo:', error);
            res.status(500).send(`Error adding a photo: ${error.message}`);
        }
    }
}