"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadService = void 0;
const aws_sdk_1 = require("aws-sdk");
const common_1 = require("@nestjs/common");
let FileUploadService = class FileUploadService {
    async upload(file) {
        const result = await this.uploadS3(file.buffer, process.env.AWS_BUCKET, this.changeFileName(file));
        if (!result) {
            throw new Error('Error uploading file');
        }
        return result;
    }
    async uploadS3(file, bucket, name) {
        const s3 = this.getS3();
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => {
                if (err) {
                    common_1.Logger.error(err);
                    reject(err.message);
                }
                resolve(data);
            });
        });
    }
    getS3() {
        return new aws_sdk_1.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            endpoint: process.env.AWS_ENDPOINT,
            region: process.env.AWS_REGION,
        });
    }
    async getSignedUrl(key) {
        const s3 = this.getS3();
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
            Expires: 60 * 5,
        };
        return await s3.getSignedUrlPromise('getObject', params);
    }
    changeFileName(file) {
        const { originalname } = file;
        const fileExtension = originalname.split('.').pop();
        return `${Date.now()}.${fileExtension}`;
    }
    async deleteFile(key) {
        const s3 = this.getS3();
        const params = {
            Bucket: process.env.AWS_BUCKET,
            Key: key,
        };
        return await s3.deleteObject(params).promise();
    }
};
FileUploadService = __decorate([
    (0, common_1.Injectable)()
], FileUploadService);
exports.FileUploadService = FileUploadService;
//# sourceMappingURL=upload.service.js.map