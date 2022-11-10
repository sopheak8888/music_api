import { CommentService } from './comment.service';
import { User } from '../auth/schemas/user.schema';
import { CommentDto } from './dto/comment.dto';
export declare class CommentController {
    private commentService;
    constructor(commentService: CommentService);
    getComments(page: number, musicId: string, userId: string): Promise<import("./schemas/comment.schema").Comment[]>;
    createComment(commentDto: CommentDto, user: User): Promise<import("./schemas/comment.schema").Comment>;
    updateComment(commentId: string, commentDto: CommentDto, user: User): Promise<import("./schemas/comment.schema").Comment>;
    deleteComment(commentId: string, user: User): Promise<void>;
}
