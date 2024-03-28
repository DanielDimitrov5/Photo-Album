import Photo from "../database/models/photo";
import User from "../database/models/user";
import { IPhotoService } from "../interfaces/photos/IPhotoService";

export default class PhotoService implements IPhotoService{
    async getPhotos(page = 1, limit = 9, userId?: number) {

        const offset = (page - 1) * limit;

        const { count: totalPhotos, rows: photos } = await Photo.findAndCountAll({
            where: userId ? {userId} : undefined,
            include: [{
                model: User,
                as: 'user',
                attributes: ['username']
            }],
            attributes: ['id', 'title', 'description', 'url', 'createdAt', 'userId'],
            limit,
            offset,
            order: [['createdAt', 'DESC']]
        });

        return {totalPhotos, photos};
    }
    
    async addPhoto(title: string, description: string, url: string, userId: number) {
        const canAdd = await this.canAddPhoto(userId);

        if (!canAdd) {
            throw new Error('You can only add 10 photos');
        }
        // Create a new photo & return is's id;
        
        const photo = await Photo.create({title, description, url, userId});
        return photo.id;
    }

    async getPhoto(id: number) {
        const photo = await Photo.findByPk(id, {
            include: [{
                model: User,
                as: 'user',
                attributes: ['username']
            }],
            attributes: ['id', 'title', 'description', 'url', 'createdAt', 'userId']
        });
        
        return photo;
    }

    async deletePhoto(id: number, userId: number) {
        const photo = await Photo.findByPk(id);
        const user = await User.findByPk(userId);

        if (!photo) {
            throw new Error('Photo not found');
        }

        if (!await this.isOwner(userId, id) && !user?.isAdmin) {
            throw new Error('You are not the owner of this photo');
        }

        await photo.destroy();
    }

    async isOwner(userId: number, photoId: number) {
        const photo = await Photo.findByPk(photoId);
        if (!photo) {
            throw new Error('Photo not found');
        }
        return photo.userId === userId;
    }

    private async canAddPhoto(userId: number) {
        const count = await Photo.count({where: {userId}});
        const maxPhotos = parseInt(process.env.MAX_PHOTOS || '10', 10);
        return count < maxPhotos;
    }
}

