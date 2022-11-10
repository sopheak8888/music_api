import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MusicDocument = Music & mongoose.Document;

@Schema({ versionKey: false })
export class Music {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  artist: string;

  @Prop({ required: true })
  album: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  year: number;

  @Prop()
  file: string;

  @Prop({ required: true })
  createdAt: Date;

  @Prop({ required: true })
  updatedAt: Date;

  @Prop({ required: true })
  user: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }] })
  comments: string[];
}

export const MusicSchema = SchemaFactory.createForClass(Music);
