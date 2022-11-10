/// <reference types="multer" />
import { Model } from 'mongoose';
import { Music } from './schemas/music.schema';
import { CreateMusicDto, UpdateMusicDto } from './dto/music.dto';
import { FilterMusicDto } from './dto/filter-music.dto';
import { FileUploadService } from './services/upload.service';
import { User } from '../auth/schemas/user.schema';
import { CreateFileDto } from './dto/file.dto';
export declare class MusicService {
    private musicModel;
    private readonly fileUploadService;
    constructor(musicModel: Model<Music>, fileUploadService: FileUploadService);
    getAllMusic(filterDto: FilterMusicDto): Promise<Music[]>;
    uploadMusic(music: CreateMusicDto, file: CreateFileDto, user: User): Promise<Music>;
    updateMusic(id: string, music: UpdateMusicDto, file: Express.Multer.File, user: User): Promise<void>;
    deleteMusic(id: string, user: User): Promise<void>;
}
