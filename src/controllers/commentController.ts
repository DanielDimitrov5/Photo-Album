import { Response } from "express";
import { ICommentService } from "../interfaces/comments/ICommentServices";
import { RequestSession } from "../interfaces/users/ISession";

export default class CommentController {
    commentService: ICommentService;

    constructor(commentService: ICommentService) {
        this.commentService = commentService;
    }

    // Add a comment to a photo
    addComment = async (req: RequestSession, res: Response) => {
        const { photoId, text } = req.body;

        try {
            const userId = req.session.userId ?? 0;

            // Call the commentService to add the comment
            await this.commentService.addComment(photoId, userId, text);
            res.redirect(`/photos/${photoId}`);
        } catch (error: any) {
            console.error('Error adding comment:', error);
            res.status(500).send(`Error adding comment: ${error.message}`);
        }
    }

    // Delete a comment from a photo
    deleteComment = async (req: RequestSession, res: Response) => {
        const { photoId, commentId } = req.body;
        const userId = req.session.userId ?? 0;

        // Call the commentService to delete the comment
        await this.commentService.deleteComment(commentId, userId);
        res.redirect(`/photos/${photoId}`);
    }
}