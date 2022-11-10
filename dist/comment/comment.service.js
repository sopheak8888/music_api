"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const music_schema_1 = require("../music/schemas/music.schema");
let CommentService = class CommentService {
    constructor(comment, music) {
        this.comment = comment;
        this.music = music;
    }
    async getComments(page, musicId, userId) {
        const query = {};
        if (musicId)
            query['music'] = musicId;
        if (userId)
            query['user'] = userId;
        return this.comment
            .find(query)
            .skip((page - 1) * 10)
            .limit(10);
    }
    async createComment(commentDto, userId) {
        const { content, musicId } = commentDto;
        const music = await this.music.findById(musicId);
        if (!music)
            throw new Error('Music not found');
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
    async updateComment(commentId, commentDto, userId) {
        const { content, musicId } = commentDto;
        try {
            return this.comment.findOneAndUpdate({ _id: commentId, user: userId, music: musicId }, { content });
        }
        catch (e) {
            throw new Error(e);
        }
    }
    async deleteComment(id, user) {
        const comment = await this.comment.findOneAndDelete({ _id: id, user });
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with id ${id} not found`);
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __param(1, (0, mongoose_1.InjectModel)(music_schema_1.Music.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map