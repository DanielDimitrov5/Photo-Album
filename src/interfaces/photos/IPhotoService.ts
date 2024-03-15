import { Model } from "sequelize";

export interface IPhotoService {
    getPhotos(page: number, limit: number, userId?: number): Promise<any>;
    addPhoto(title: string, description: string, url: string, userId: number): Promise<any>;
    getPhoto(id: number): Promise<any>;
    deletePhoto(id: number, userId: number): Promise<any>;
    isOwner(userId: number, photoId: number): Promise<any>;
}

export interface IPhotoModel extends Model{
    id: number;
    title: string;
    description: string;
    url: string;
    userId: number;
    createdAt: Date;
    user: {
        username: string;
    }
}