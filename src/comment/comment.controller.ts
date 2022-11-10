import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDoc,
  DeleteCommentDoc,
  GetMusicDoc,
  UpdateCommentDoc,
} from './swaggers/comment.decorator';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/schemas/user.schema';
import { CommentDto } from './dto/comment.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('comment')
@ApiTags('Comment')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @GetMusicDoc
  @Get()
  async getComments(
    @Query('page') page: number,
    @Query('music') musicId: string,
    @Query('user') userId: string,
  ) {
    return this.commentService.getComments(page, musicId, userId);
  }

  @CreateCommentDoc
  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async createComment(@Body() commentDto: CommentDto, @GetUser() user: User) {
    return await this.commentService.createComment(commentDto, user._id);
  }

  @UpdateCommentDoc
  @Patch(':id')
  @UseGuards(AuthGuard())
  @UsePipes(new ValidationPipe({ groups: ['update'] }))
  async updateComment(
    @Param('id') commentId: string,
    @Body() commentDto: CommentDto,
    @GetUser() user: User,
  ) {
    return await this.commentService.updateComment(
      commentId,
      commentDto,
      user._id,
    );
  }

  @DeleteCommentDoc
  @Delete(':id')
  @UseGuards(AuthGuard())
  async deleteComment(@Param('id') commentId: string, @GetUser() user: User) {
    return await this.commentService.deleteComment(commentId, user._id);
  }
}
