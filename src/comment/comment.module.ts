import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { Comment, CommentSchema } from './schemas/comment.schema';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Music, MusicSchema } from '../music/schemas/music.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comment.name, schema: CommentSchema },
      { name: Music.name, schema: MusicSchema },
    ]),
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
