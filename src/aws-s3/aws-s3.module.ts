import { Module } from '@nestjs/common';
import { AwsS3Service } from './aws-s3.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  providers: [AwsS3Service],
  imports: [ConfigModule],
  exports: [AwsS3Service],
})
export class AwsS3Module {}
