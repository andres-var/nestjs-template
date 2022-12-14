import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { SeedsModule } from './seeds/seeds.module';
import { AuthModule } from './auth/auth.module';
import { AwsS3Service } from './aws-s3/aws-s3.service';
import { AwsS3Module } from './aws-s3/aws-s3.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    CommonModule,
    SeedsModule,
    AuthModule,
    FilesModule,
    AwsS3Module,
  ],
  controllers: [],
  providers: [AwsS3Service],
})
export class AppModule {}
