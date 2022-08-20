import { join } from 'path';
import { BadRequestException, Injectable } from '@nestjs/common';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  getStaticImage(type: string, imageName: string) {
    const path = join(__dirname, `../../static/${type}`, imageName);

    if (!existsSync(path)) {
      throw new BadRequestException('Not found Image');
    }

    return path;
  }
}
