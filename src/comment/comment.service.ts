import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schemas/comment.schema';
import { CommentDto } from './dto/comment.dto';
import { Music } from '../music/schemas/music.schema';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private comment: Model<Comment>,
    @InjectModel(Music.name) private music: Model<Music>,
  ) {}

  async getComments(
    page: number,
    musicId: string,
    userId: string,
  ): Promise<Comment[]> {
    const query = {};
    if (musicId) query['music'] = musicId;
    if (userId) query['user'] = userId;
    return this.comment
      .find(query)
      .skip((page - 1) * 10)
      .limit(10);
  }

  async createComment(
    commentDto: CommentDto,
    userId: string,
  ): Promise<Comment> {
    const { content, musicId } = commentDto;
    const music = await this.music.findById(musicId);
    if (!music) throw new Error('Music not found');
    const newComment = await this.comment.create({
      content,
      music: musicId,
      user: userId,
    });
    await this.music.findByIdAndUpdate(musicId, {
      $push: { comments: newComment._id },
    });
    return newComment;
  }

  async updateComment(
    commentId: string,
    commentDto: CommentDto,
    userId: string,
  ): Promise<Comment> {
    const { content, musicId } = commentDto;
    try {
      return this.comment.findOneAndUpdate(
        { _id: commentId, user: userId, music: musicId },
        { content },
      );
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteComment(id: string, user: string): Promise<void> {
    const comment = await this.comment.findOneAndDelete({ _id: id, user });
    if (!comment) {
      throw new NotFoundException(`Comment with id ${id} not found`);
    }
  }
}
