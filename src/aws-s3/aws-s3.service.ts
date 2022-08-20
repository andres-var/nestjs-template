import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class AwsS3Service {
  constructor(private readonly configService: ConfigService) {}

  private readonly logger = new Logger();
  private readonly AWS_S3_BUCKET = this.configService.get('AWS_S3_BUCKET');
  private readonly aws = AWS;
  private readonly awsS3 = new AWS.S3({
    accessKeyId: this.configService.get('AWS_S3_ACCESS_KEY'),
    secretAccessKey: this.configService.get('AWS_S3_KEY_SECRET'),
  });

  async uploadFile(file: Express.Multer.File) {
    const params = {
      Bucket: this.AWS_S3_BUCKET,
      Key: String(uuid()),
      Body: file.buffer,
      ContentType: file.mimetype,
    };

    try {
      return await this.awsS3.upload(params).promise();
    } catch (e) {
      this.logger.error('Error connecting to S3', e);

      if (e.code === 'InvalidBucketName') {
        throw new InternalServerErrorException('CHECK THE LOGS');
      }
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
