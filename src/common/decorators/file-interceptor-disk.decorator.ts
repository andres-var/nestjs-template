import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter } from 'src/files/helpers/fileFilter.helper';
import { fileNamer } from 'src/files/helpers/fileNamer.helper';

export function FileInterceptorDisk(name: string, folder: string) {
  return applyDecorators(
    UseInterceptors(
      FileInterceptor(name, {
        fileFilter: fileFilter,
        storage: diskStorage({
          destination: `./static/${folder}`,
          filename: fileNamer,
        }),
      }),
    ),
  );
}
