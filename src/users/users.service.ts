import { Injectable } from '@nestjs/common';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly awsS3Service: AwsS3Service) {}

  async create(createUserDto: CreateUserDto, file: Express.Multer.File) {
    const s3 = await this.awsS3Service.uploadFile(file);
    return {
      s3: s3.Location,
      //   createUserDto,
    };
  }

  findAll() {
    return 'This action returns all users';
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
