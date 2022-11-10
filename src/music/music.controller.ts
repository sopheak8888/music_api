import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MusicService } from './music.service';
import { Music } from './schemas/music.schema';
import { CreateMusicDto, UpdateMusicDto } from './dto/music.dto';
import { FilterMusicDto } from './dto/filter-music.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from '../auth/schemas/user.schema';
import {
  CreateMusicDoc,
  DeleteMusicDoc,
  GetMusicDoc,
  UpdateMusicDoc,
} from './swaggers/music.decorator';
import { CreateFileDto } from './dto/file.dto';

@Controller('music')
@ApiTags('Music')
export class MusicController {
  constructor(private musicService: MusicService) {}

  @GetMusicDoc
  @Get()
  async getAllMusic(@Query() filterDto: FilterMusicDto): Promise<Music[]> {
    return this.musicService.getAllMusic(filterDto);
  }

  @CreateMusicDoc
  @Post()
  @UseGuards(AuthGuard())
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg') {
          cb(null, true);
        } else {
          return req.res.status(415).json({
            message: 'Unsupported Media Type',
          });
        }
      },
    }),
  )
  @UsePipes(ValidationPipe)
  async uploadMusic(
    @Body() music: CreateMusicDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: true,
      }),
    )
    file: CreateFileDto,
    @GetUser() user: User,
  ): Promise<Music> {
    return this.musicService.uploadMusic(music, file, user);
  }

  @UpdateMusicDoc
  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 1024 * 1024 * 10,
      },
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'audio/mpeg') {
          cb(null, true);
        } else {
          return req.res.status(415).json({
            message: 'Unsupported Media Type',
          });
        }
      },
    }),
  )
  async updateMusic(
    @Param('id') id: string,
    @Body() music: UpdateMusicDto,
    @UploadedFile() file: Express.Multer.File,
    @GetUser() user: User,
  ): Promise<void> {
    await this.musicService.updateMusic(id, music, file, user);
  }

  @DeleteMusicDoc
  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deleteMusic(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<void> {
    await this.musicService.deleteMusic(id, user);
  }
}
