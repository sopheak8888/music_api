"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MusicModule = void 0;
var common_1 = require("@nestjs/common");
var music_controller_1 = require("./music.controller");
var music_service_1 = require("./music.service");
var mongoose_1 = require("@nestjs/mongoose");
var music_schema_1 = require("./schemas/music.schema");
var auth_module_1 = require("../../../../../../../../src/auth/auth.module");
var upload_service_1 = require("./services/upload.service");
var MusicModule = /** @class */ (function () {
    function MusicModule() {
    }
    MusicModule = __decorate([
        (0, common_1.Module)({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: music_schema_1.Music.name, schema: music_schema_1.MusicSchema }]),
                auth_module_1.AuthModule,
            ],
            controllers: [music_controller_1.MusicController],
            providers: [music_service_1.MusicService, upload_service_1.FileUploadService]
        })
    ], MusicModule);
    return MusicModule;
}());
exports.MusicModule = MusicModule;
