import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';

export const GetMusicDoc = applyDecorators(
  ApiConsumes('multipart/form-data'),
  ApiQuery({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
  }),
  ApiQuery({
    name: 'title',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'artist',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'album',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'genre',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'yearFrom',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'yearTo',
    required: false,
    type: String,
  }),
  ApiQuery({
    name: 'user',
    required: false,
    type: String,
  }),
);

export const CreateMusicDoc = applyDecorators(
  ApiConsumes('multipart/form-data'),
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        artist: { type: 'string' },
        album: { type: 'string' },
        genre: { type: 'string' },
        year: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['title'],
    },
  }),
  ApiResponse({ status: 500, description: 'Internal server error' }),
  ApiResponse({ status: 201, description: 'Music created successfully' }),
  ApiResponse({ status: 409, description: 'Music already exists' }),
  ApiBearerAuth(),
);

export const UpdateMusicDoc = applyDecorators(
  ApiConsumes('multipart/form-data'),
  ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string' },
        artist: { type: 'string' },
        album: { type: 'string' },
        genre: { type: 'string' },
        year: { type: 'string' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  }),
  ApiResponse({ status: 500, description: 'Internal server error' }),
  ApiResponse({ status: 200, description: 'Success' }),
  ApiParam({ name: 'id', type: 'string' }),
  ApiBearerAuth(),
);

export const DeleteMusicDoc = applyDecorators(
  ApiParam({ name: 'id', type: 'string' }),
  ApiBearerAuth(),
);
