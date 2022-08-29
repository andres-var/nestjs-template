import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  Matches,
  IsArray,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { Roles } from 'src/auth/interfaces';

export class CreateUserDto {
  @ApiProperty({ example: 'example@example.com' })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Julio' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'Vargas' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: 'julio_var' })
  @IsString()
  alias: string;

  @ApiProperty({
    enum: Roles,
    isArray: true,
    example: [Roles.ADMIN, Roles.SUPER_ADMIN, Roles.COSULT, Roles.USER],
  })
  @IsArray()
  roles: Roles[];

  @ApiProperty({ example: 'Asd123' })
  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
