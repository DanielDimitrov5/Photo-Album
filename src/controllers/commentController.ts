import { Response } from "express";
import { ICommentService } from "../interfaces/comments/ICommentServices";
import { RequestSession } from "../interfaces/users/ISession";

export default class CommentController {
    commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    addComment = async (req: RequestSession, res: Response) => {
        const { photoId, text } = req.body;

        try {
            const userId = req.session.userId ?? 0;

            await this.commentService.addComment(photoId, userId, text);
            res.redirect(`/photos/${photoId}`);
        } catch (error: any) {
            console.error('Error adding comment:', error);
            res.status(500).send(`Error adding comment: ${error.message}`);
        }

    }

    deleteComment = async (req: RequestSession, res: Response) => {
        const { photoId, commentId } = req.body;
        const userId = req.session.userId ?? 0;
        await this.commentService.deleteComment(commentId, userId);
        res.redirect(`/photos/${photoId}`);
    }
}