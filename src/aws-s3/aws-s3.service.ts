import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  constructor(private readonly configService: ConfigService) {}

  private readonly aws = AWS;
  private readonly awsS3 = new AWS.S3({
    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
    secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
  });

  async uploadFile(file) {
    const { originalname } = file;

    // const params = {
    // 	Bucket: this.AWS_S3_BUCKET,
    // 	Key: String(originalname),
    // 	Body: file.buffer,
    // 	ContentType: file.mimetype,
    // };

    try {
      // const s3Response = await this.awsS3.upload(params).promise();
      // console.log(s3Response);
      // return s3Response;
    } catch (e) {
      throw new InternalServerErrorException();
    }
  }

  async removeFileFromS3(Key: string) {
    // const s3Response = await this.awsS3
    // 	.deleteObject({
    // 		Key,
    // 		Bucket: this.AWS_S3_BUCKET,
    // 	})
    // 	.promise();
    // return s3Response;
  }
}
