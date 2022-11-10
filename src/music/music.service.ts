import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Music } from './schemas/music.schema';
import { CreateMusicDto, UpdateMusicDto } from './dto/music.dto';
import { FilterMusicDto } from './dto/filter-music.dto';
import { FileUploadService } from './services/upload.service';
import { User } from '../auth/schemas/user.schema';
import { CreateFileDto } from './dto/file.dto';

@Injectable()
export class MusicService {
  constructor(
    @InjectModel(Music.name) private musicModel: Model<Music>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async getAllMusic(filterDto: FilterMusicDto): Promise<Music[]> {
    return this.musicModel
      .find({
        year: {
          $gte: filterDto.yearFrom ? filterDto.yearFrom : 0,
          $lte: filterDto.yearTo ? filterDto.yearTo : 9999,
        },
        title: filterDto.title
          ? { $regex: filterDto.title }
          : { $exists: true },
        artist: filterDto.artist
          ? { $regex: filterDto.artist }
          : { $exists: true },
        album: filterDto.album
          ? { $regex: filterDto.album }
          : { $exists: true },
        genre: filterDto.genre
          ? { $regex: filterDto.genre }
          : { $exists: true },
        user: filterDto.user ? { $regex: filterDto.user } : { $exists: true },
      })
      .skip((filterDto.page - 1) * 10)
      .populate('comments', null, null, { limit: 10 })
      .limit(10);
  }

  async uploadMusic(
    music: CreateMusicDto,
    file: CreateFileDto,
    user: User,
  ): Promise<Music> {
    const result = await this.fileUploadService.upload(file);
    try {
      return await this.musicModel.create({
        ...music,
        file: result.key,
        user: user._id,
        updatedAt: new Date(),
        createdAt: new Date(),
      });
    } catch (error) {
      await this.fileUploadService.deleteFile(result.key);
      if (error.code === 11000) {
        throw new ConflictException(
          'Music already exists. Please change title',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async updateMusic(
    id: string,
    music: UpdateMusicDto,
    file: Express.Multer.File,
    user: User,
  ): Promise<void> {
    if (file) {
      const result = await this.fileUploadService.upload(file);
      music.file = result.key;
    }
    Object.keys(music).forEach(
      (key) => music[key] === null && delete music[key],
    );
    const updated = await this.musicModel.findOneAndUpdate(
      {
        _id: id,
        user: user._id,
      },
      { ...music, updatedAt: new Date() },
    );
    if (!updated) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }
  }

  async deleteMusic(id: string, user: User): Promise<void> {
    const result = await this.musicModel.findOneAndDelete({
      _id: id,
      user: user._id,
    });
    if (!result) {
      throw new NotFoundException(`Music with ID ${id} not found`);
    }
  }
}
