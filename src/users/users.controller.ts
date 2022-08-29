import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Controller,
  UploadedFile,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Auth } from 'src/auth/decorators';
import { Roles } from 'src/auth/interfaces';
import { FileInterceptorS3 } from 'src/common/decorators/file-interceptor-s3.decorator';
import { ApiResponses } from 'src/common/decorators/api-responses.decorator';
import { PageDto, PageOptionsDto } from 'src/common/dtos';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiResponses()
  @ApiCreatedResponse({ description: 'Created User', type: User })
  @Auth()
  @Post()
  @FileInterceptorS3('file')
  create(
    // @UploadedFile() file: Express.Multer.File,
    @Body() createUserDto: CreateUserDto,
  ) {
    return this.usersService.create(createUserDto);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found Users', type: PageDto })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Auth(Roles.USER)
  @Get()
  findAll(@Query() pageOptionsDto: PageOptionsDto) {
    return this.usersService.findAll(pageOptionsDto);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found User' })
  @ApiOkResponse({ description: 'Users', type: User })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found User' })
  @ApiOkResponse({ description: 'Updated User', type: User })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @ApiResponses()
  @ApiNotFoundResponse({ description: 'Not found User' })
  @ApiOkResponse({ description: 'Deleted User' })
  @Auth(Roles.ADMIN, Roles.SUPER_ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
