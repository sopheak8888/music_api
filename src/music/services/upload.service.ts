import { S3 } from 'aws-sdk';
import { Logger, Injectable } from '@nestjs/common';

@Injectable()
export class FileUploadService {
  async upload(file): Promise<any> {
    const result = await this.uploadS3(
      file.buffer,
      process.env.AWS_BUCKET,
      this.changeFileName(file),
    );
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
          Logger.error(err);
          reject(err.message);
        }
        resolve(data);
      });
    });
  }

  getS3() {
    return new S3({
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
}
