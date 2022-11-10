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
exports.MusicController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const music_service_1 = require("./music.service");
const music_dto_1 = require("./dto/music.dto");
const filter_music_dto_1 = require("./dto/filter-music.dto");
const platform_express_1 = require("@nestjs/platform-express");
const passport_1 = require("@nestjs/passport");
const get_user_decorator_1 = require("../auth/get-user.decorator");
const user_schema_1 = require("../auth/schemas/user.schema");
const music_decorator_1 = require("./swaggers/music.decorator");
const file_dto_1 = require("./dto/file.dto");
let MusicController = class MusicController {
    constructor(musicService) {
        this.musicService = musicService;
    }
    async getAllMusic(filterDto) {
        return this.musicService.getAllMusic(filterDto);
    }
    async uploadMusic(music, file, user) {
        return this.musicService.uploadMusic(music, file, user);
    }
    async updateMusic(id, music, file, user) {
        await this.musicService.updateMusic(id, music, file, user);
    }
    async deleteMusic(id, user) {
        await this.musicService.deleteMusic(id, user);
    }
};
__decorate([
    music_decorator_1.GetMusicDoc,
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_music_dto_1.FilterMusicDto]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "getAllMusic", null);
__decorate([
    music_decorator_1.CreateMusicDoc,
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 1024 * 1024 * 10,
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'audio/mpeg') {
                cb(null, true);
            }
            else {
                return req.res.status(415).json({
                    message: 'Unsupported Media Type',
                });
            }
        },
    })),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)(new common_1.ParseFilePipe({
        fileIsRequired: true,
    }))),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [music_dto_1.CreateMusicDto,
        file_dto_1.CreateFileDto,
        user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "uploadMusic", null);
__decorate([
    music_decorator_1.UpdateMusicDoc,
    (0, common_1.Patch)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        limits: {
            fileSize: 1024 * 1024 * 10,
        },
        fileFilter: (req, file, cb) => {
            if (file.mimetype === 'audio/mpeg') {
                cb(null, true);
            }
            else {
                return req.res.status(415).json({
                    message: 'Unsupported Media Type',
                });
            }
        },
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __param(3, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, music_dto_1.UpdateMusicDto, Object, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "updateMusic", null);
__decorate([
    music_decorator_1.DeleteMusicDoc,
    (0, common_1.Delete)('/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_schema_1.User]),
    __metadata("design:returntype", Promise)
], MusicController.prototype, "deleteMusic", null);
MusicController = __decorate([
    (0, common_1.Controller)('music'),
    (0, swagger_1.ApiTags)('Music'),
    __metadata("design:paramtypes", [music_service_1.MusicService])
], MusicController);
exports.MusicController = MusicController;
//# sourceMappingURL=music.controller.js.map