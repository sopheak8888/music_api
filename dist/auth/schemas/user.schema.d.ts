import mongoose from 'mongoose';
export declare type UserDocument = User & mongoose.Document;
export declare class User {
    _id: string;
    username: string;
    password: string;
    salt: string;
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, any>, {}, {}, {}, {}, "type", User>;
