"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMusicDoc = exports.UpdateMusicDoc = exports.CreateMusicDoc = exports.GetMusicDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
exports.GetMusicDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiQuery)({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
}), (0, swagger_1.ApiQuery)({
    name: 'title',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'artist',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'album',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'genre',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'yearFrom',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'yearTo',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'user',
    required: false,
    type: String,
}));
exports.CreateMusicDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
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
}), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }), (0, swagger_1.ApiResponse)({ status: 201, description: 'Music created successfully' }), (0, swagger_1.ApiResponse)({ status: 409, description: 'Music already exists' }), (0, swagger_1.ApiBearerAuth)());
exports.UpdateMusicDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, swagger_1.ApiBody)({
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
}), (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal server error' }), (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }), (0, swagger_1.ApiParam)({ name: 'id', type: 'string' }), (0, swagger_1.ApiBearerAuth)());
exports.DeleteMusicDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({ name: 'id', type: 'string' }), (0, swagger_1.ApiBearerAuth)());
//# sourceMappingURL=music.decorator.js.map