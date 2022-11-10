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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async signUp(authCredentialsDto) {
        return await this.authService.signUp(authCredentialsDto);
    }
    async signIn(authCredentialsDto) {
        return await this.authService.signIn(authCredentialsDto);
    }
};
__decorate([
    (0, common_1.Post)('/signup'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, swagger_1.ApiOperation)({ summary: 'Sign up' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'test',
                    description: 'Username required , must be at least 4 characters long and at most 20 characters long',
                },
                password: {
                    type: 'string',
                    example: '@Test1234',
                    description: 'Password required , must be at least 8 characters long and at most 20 characters long and must contain at least one uppercase letter, one lowercase letter, one number or special character',
                },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signUp", null);
__decorate([
    (0, common_1.Post)('/signin'),
    (0, swagger_1.ApiOperation)({ summary: 'Sign in' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Success' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'test',
                    description: 'Username required , must be at least 4 characters long and at most 20 characters long',
                },
                password: {
                    type: 'string',
                    example: '@Test1234',
                    description: 'Password required , must be at least 8 characters long and at most 20 characters long and must contain at least one uppercase letter, one lowercase letter, one number or special character',
                },
            },
        },
    }),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.AuthCredentialsDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signIn", null);
AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    (0, swagger_1.ApiTags)('Auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map