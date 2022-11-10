"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommentDoc = exports.UpdateCommentDoc = exports.CreateCommentDoc = exports.GetMusicDoc = void 0;
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
exports.GetMusicDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiQuery)({
    name: 'page',
    required: true,
    type: Number,
    example: 1,
}), (0, swagger_1.ApiQuery)({
    name: 'music',
    required: false,
    type: String,
}), (0, swagger_1.ApiQuery)({
    name: 'user',
    required: false,
    type: String,
}), (0, swagger_1.ApiBearerAuth)());
exports.CreateCommentDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')), (0, swagger_1.ApiBody)({
    schema: {
        type: 'object',
        properties: {
            content: { type: 'string' },
            musicId: { type: 'string' },
        },
        required: ['content', 'musicId'],
    },
}), (0, swagger_1.ApiResponse)({
    status: 201,
    description: 'The record has been successfully created.',
}), (0, swagger_1.ApiResponse)({
    status: 400,
    description: 'Bad Request',
}), (0, swagger_1.ApiResponse)({
    status: 401,
    description: 'Unauthorized',
}), (0, swagger_1.ApiBearerAuth)());
exports.UpdateCommentDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiConsumes)('multipart/form-data'), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')), (0, swagger_1.ApiBody)({
    schema: {
        type: 'object',
        properties: {
            content: { type: 'string' },
            musicId: { type: 'string' },
        },
        required: ['content', 'musicId'],
    },
}), (0, swagger_1.ApiResponse)({
    status: 200,
    description: 'The record has been successfully updated.',
}), (0, swagger_1.ApiResponse)({
    status: 400,
    description: 'Bad Request',
}), (0, swagger_1.ApiResponse)({
    status: 401,
    description: 'Unauthorized',
}), (0, swagger_1.ApiBearerAuth)());
exports.DeleteCommentDoc = (0, common_1.applyDecorators)((0, swagger_1.ApiParam)({
    name: 'id',
    description: 'Comment ID',
}), (0, swagger_1.ApiResponse)({
    status: 200,
    description: 'The record has been successfully deleted.',
}), (0, swagger_1.ApiResponse)({
    status: 400,
    description: 'Bad Request',
}), (0, swagger_1.ApiResponse)({
    status: 401,
    description: 'Unauthorized',
}), (0, swagger_1.ApiBearerAuth)());
//# sourceMappingURL=comment.decorator.js.map