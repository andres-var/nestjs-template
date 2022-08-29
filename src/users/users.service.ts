import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { PageDto, PageMetaDto, PageOptionsDto } from 'src/common/dtos';
import { BcryptAdapter } from 'src/common/adapters/bcrypt.adapter';

@Injectable()
export class UsersService {
  constructor(
    // private readonly awsS3Service: AwsS3Service,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly bcrypt: BcryptAdapter,
  ) {}

  private readonly logger = new Logger('UserServices');

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Check server logs');
  }

  async create(createUserDto: CreateUserDto, file?: Express.Multer.File) {
    try {
      const { password, ...userData } = createUserDto;

      const user = this.userRepository.create({
        ...userData,
        password: this.bcrypt.hashSync(password),
      });

      await this.userRepository.save(user);
      delete user.password;

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll(pageOptionsDto: PageOptionsDto) {
    const itemCount = await this.userRepository.countBy({});

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    const users = await this.userRepository.find({
      skip: pageOptionsDto.skip,
      take: pageOptionsDto.limit,
    });

    return new PageDto(users, pageMetaDto);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`User not found with id: ${id}`);
    }

    delete user.password;

    return user;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
    file?: Express.Multer.File,
  ) {
    if (updateUserDto.password) {
      updateUserDto.password = this.bcrypt.hashSync(updateUserDto.password);
    }

    const user: User = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with id : ${id} not found`);
    }

    try {
      await this.userRepository.save(user);

      return user;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async remove(id: string) {
    const user = await this.userRepository.delete({ id });

    if (user.affected === 0) {
      throw new NotFoundException(`User not found with id: ${id}`);
    }

    return `User removed with id:${id}`;
  }
}
