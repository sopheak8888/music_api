import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & mongoose.Document;

@Schema({ versionKey: false })
export class User {
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  salt: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
