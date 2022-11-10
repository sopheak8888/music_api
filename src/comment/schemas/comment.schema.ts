import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type CommentDocument = Comment & mongoose.Document;

@Schema({ versionKey: false })
export class Comment {
  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  user: string;

  @Prop({ required: true })
  music: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
