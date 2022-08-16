import {
  BadRequestException,
  Get,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';

import * as bcrypt from 'bcryptjs';

import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { IJwtPayload } from './interfaces/jwt-payload';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtServices: JwtService,
  ) {}

  private getJwtToken(paylod: IJwtPayload) {
    const token = this.jwtServices.sign(paylod);
    return token;
  }

  async register(registerDto: RegisterDto) {
    try {
      const { password, ...userData } = registerDto;

      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.userRepository.save(user);
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({
          id: user.id,
          name: user.name,
          email: user.email,
        }),
      };
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login(loginDto: LoginDto) {
    const { password, email } = loginDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true },
    });

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({
        id: user.id,
        name: user.name,
        email,
      }),
    };
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    throw new InternalServerErrorException('Check server logs');
  }
}
