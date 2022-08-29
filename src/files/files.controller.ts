import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { FileInterceptorDisk } from 'src/common/decorators/file-interceptor-disk.decorator';
import { FilesService } from './files.service';

@ApiTags('Files')
@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService,
  ) {}

  @Get(':type/:imageName')
  finfImage(
    @Res() res: Response,
    @Param('type') type: string,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticImage(type, imageName);

    return res.status(200).sendFile(path);
  }

  @Post('user/avatar')
  @FileInterceptorDisk('file', 'users')
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Make sure that the file an image');
    }

    const secureUrl = `${this.configService.get('HOST_API')}/files/users/${
      file.filename
    }`;

    return secureUrl;
  }
}
