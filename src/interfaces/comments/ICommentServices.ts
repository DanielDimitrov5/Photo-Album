export interface ICommentService {
    addComment(photoId: number, userId: number, text: string): Promise<any>;
    deleteComment(commentId: number, userId: number): Promise<any>;
    getComments(photoId: number): Promise<any>;
}