import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ApiBadGatewayResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/decorators';
import { Roles } from 'src/auth/interfaces';
import { FileInterceptorS3 } from 'src/common/decorators/file-interceptor-s3.decorator';
import { ApiResponses } from 'src/common/decorators/api-responses.decorator';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponses()
  @ApiCreatedResponse({ description: 'Created User', type: User })
  @Auth()
  @Post()
  @FileInterceptorS3('file')
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto, file);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found Users' })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found User' })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found User', type: User })
  @ApiOkResponse({ description: 'Updated User' })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found User' })
  @ApiOkResponse({ description: 'Deleted User' })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
