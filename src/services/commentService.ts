import { ICommentService } from "../interfaces/comments/ICommentServices";
import Comment from "../database/models/comment";
import User from "../database/models/user";

export class CommentService implements ICommentService {
    async addComment(photoId: number, userId: number, text: string): Promise<any> {
        if (!text) {
            throw new Error('Comment cannot be empty');
        }

        if(!await this.canAddComment(photoId)) {
            throw new Error('You can only add 10 comments under a photo');
        }

        return await Comment.create({ content: text, photoId: photoId, userId: userId});
    }

    async deleteComment(commentId: number, userId: number): Promise<any> {
        const user = await User.findByPk(userId);

        if (!user?.isAdmin) {
            throw new Error('You are not allowed to delete this comment');
        }

        return Comment.destroy({ where: { id: commentId } });
    }

    async getComments(photoId: number): Promise<any> {
        return await Comment.findAll({
            where: { photoId: photoId },
            include: [{
                model: User,
                as: 'user',
                attributes: ['username'],
            }]
        });
    }

    private async canAddComment(photoId: number): Promise<boolean> {
        const count = await Comment.count({ where: { photoId } });
        return count < 10;
    }
}