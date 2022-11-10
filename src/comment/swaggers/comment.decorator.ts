import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

export const GetMusicDoc = applyDecorators(
  ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
  }),
  ApiQuery({
    name: 'music',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'user',
    required: false,
    type: String,
  }),
  ApiBearerAuth(),
);

export const CreateCommentDoc = applyDecorators(
  ApiConsumes('multipart/form-data'),
  UseInterceptors(FileInterceptor('file')),
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        musicId: { type: 'string' },
      },
      required: ['content', 'musicId'],
    },
  }),
  ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request',
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized',
  }),
  ApiBearerAuth(),
);

export const UpdateCommentDoc = applyDecorators(
  ApiConsumes('multipart/form-data'),
  UseInterceptors(FileInterceptor('file')),
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        content: { type: 'string' },
        musicId: { type: 'string' },
      },
      required: ['content', 'musicId'],
    },
  }),
  ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request',
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized',
  }),
  ApiBearerAuth(),
);

export const DeleteCommentDoc = applyDecorators(
  ApiParam({
    name: 'id',
    description: 'Comment ID',
  }),
  ApiResponse({
    status: 200,
    description: 'The record has been successfully deleted.',
  }),
  ApiResponse({
    status: 400,
    description: 'Bad Request',
  }),
  ApiResponse({
    status: 401,
    description: 'Unauthorized',
  }),
  ApiBearerAuth(),
);
