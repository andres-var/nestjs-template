import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { diskStorage } from 'multer';

import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { fileNamer } from './helpers/fileNamer.helper';

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
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      storage: diskStorage({
        destination: './static/users',
        filename: fileNamer,
      }),
    }),
  )
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
