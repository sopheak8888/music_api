import { Module } from '@nestjs/common';
import { MusicController } from './music.controller';
import { MusicService } from './music.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Music, MusicSchema } from './schemas/music.schema';
import { AuthModule } from 'src/auth/auth.module';
import { FileUploadService } from './services/upload.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Music.name, schema: MusicSchema }]),
    AuthModule,
  ],
  controllers: [MusicController],
  providers: [MusicService, FileUploadService],
})
export class MusicModule {}
