import { Injectable } from '@nestjs/common';
import { SignUrlInterface } from './sign-url.interface';
import * as AWS from 'aws-sdk';
import { Guid } from 'guid-typescript';

@Injectable()
export class StorageService {
  async getSignURL(data: SignUrlInterface) {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    const key = Guid.create();

    const paramsUploadS3 = {
      Bucket: process.env.S3_BUCKET,
      Key: data.path + key + '.png',
      // ExpiresIn: 3600,
    };

    const s3Uploader = new AWS.S3();

    return await s3Uploader.getSignedUrlPromise('putObject', paramsUploadS3);
  }
}
