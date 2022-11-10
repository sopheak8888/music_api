import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { MusicModule } from './music/music.module';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
    AuthModule,
    MusicModule,
    CommentModule,
  ],
})
export class AppModule {}
