import { S3 } from 'aws-sdk';
export declare class FileUploadService {
    upload(file: any): Promise<any>;
    uploadS3(file: any, bucket: any, name: any): Promise<unknown>;
    getS3(): S3;
    getSignedUrl(key: any): Promise<string>;
    changeFileName(file: any): string;
    deleteFile(key: any): Promise<import("aws-sdk/lib/request").PromiseResult<S3.DeleteObjectOutput, import("aws-sdk").AWSError>>;
}
