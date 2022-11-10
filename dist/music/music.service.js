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
exports.MusicService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const music_schema_1 = require("./schemas/music.schema");
const upload_service_1 = require("./services/upload.service");
let MusicService = class MusicService {
    constructor(musicModel, fileUploadService) {
        this.musicModel = musicModel;
        this.fileUploadService = fileUploadService;
    }
    async getAllMusic(filterDto) {
        return this.musicModel
            .find({
            year: {
                $gte: filterDto.yearFrom ? filterDto.yearFrom : 0,
                $lte: filterDto.yearTo ? filterDto.yearTo : 9999,
            },
            title: filterDto.title
                ? { $regex: filterDto.title }
                : { $exists: true },
            artist: filterDto.artist
                ? { $regex: filterDto.artist }
                : { $exists: true },
            album: filterDto.album
                ? { $regex: filterDto.album }
                : { $exists: true },
            genre: filterDto.genre
                ? { $regex: filterDto.genre }
                : { $exists: true },
            user: filterDto.user ? { $regex: filterDto.user } : { $exists: true },
        })
            .skip((filterDto.page - 1) * 10)
            .populate('comments', null, null, { limit: 10 })
            .limit(10);
    }
    async uploadMusic(music, file, user) {
        const result = await this.fileUploadService.upload(file);
        try {
            return await this.musicModel.create(Object.assign(Object.assign({}, music), { file: result.key, user: user._id, updatedAt: new Date(), createdAt: new Date() }));
        }
        catch (error) {
            await this.fileUploadService.deleteFile(result.key);
            if (error.code === 11000) {
                throw new common_1.ConflictException('Music already exists. Please change title');
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async updateMusic(id, music, file, user) {
        if (file) {
            const result = await this.fileUploadService.upload(file);
            music.file = result.key;
        }
        Object.keys(music).forEach((key) => music[key] === null && delete music[key]);
        const updated = await this.musicModel.findOneAndUpdate({
            _id: id,
            user: user._id,
        }, Object.assign(Object.assign({}, music), { updatedAt: new Date() }));
        if (!updated) {
            throw new common_1.NotFoundException(`Music with ID ${id} not found`);
        }
    }
    async deleteMusic(id, user) {
        const result = await this.musicModel.findOneAndDelete({
            _id: id,
            user: user._id,
        });
        if (!result) {
            throw new common_1.NotFoundException(`Music with ID ${id} not found`);
        }
    }
};
MusicService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(music_schema_1.Music.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        upload_service_1.FileUploadService])
], MusicService);
exports.MusicService = MusicService;
//# sourceMappingURL=music.service.js.map