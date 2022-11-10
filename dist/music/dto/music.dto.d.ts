/// <reference types="multer" />
export declare class CreateMusicDto {
    title: string;
    artist: string;
    album: string;
    genre: string;
    year: string;
    file: Express.Multer.File;
}
export declare class UpdateMusicDto {
    title: string;
    artist: string;
    album: string;
    genre: string;
    year: string;
    file: Express.Multer.File;
}
