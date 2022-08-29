import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { AwsS3Module } from 'src/aws-s3/aws-s3.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule,
    AwsS3Module,
    CommonModule,
  ],
  exports: [TypeOrmModule],
})
export class UsersModule {}
