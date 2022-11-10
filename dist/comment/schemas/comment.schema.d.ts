import mongoose from 'mongoose';
export declare type CommentDocument = Comment & mongoose.Document;
export declare class Comment {
    content: string;
    user: string;
    music: string;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, any>, {}, {}, {}, {}, "type", Comment>;
