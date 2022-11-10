import mongoose from 'mongoose';
export declare type MusicDocument = Music & mongoose.Document;
export declare class Music {
    title: string;
    artist: string;
    album: string;
    genre: string;
    year: number;
    file: string;
    createdAt: Date;
    updatedAt: Date;
    user: string;
    comments: string[];
}
export declare const MusicSchema: mongoose.Schema<Music, mongoose.Model<Music, any, any, any, any>, {}, {}, {}, {}, "type", Music>;
