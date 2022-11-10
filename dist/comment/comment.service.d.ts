import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { Music } from '../music/schemas/music.schema';
export declare class CommentService {
    private comment;
    private music;
    constructor(comment: Model<Comment>, music: Model<Music>);
    getComments(page: number, musicId: string, userId: string): Promise<Comment[]>;
    createComment(commentDto: CommentDto, userId: string): Promise<Comment>;
    updateComment(commentId: string, commentDto: CommentDto, userId: string): Promise<Comment>;
    deleteComment(id: string, user: string): Promise<void>;
}
