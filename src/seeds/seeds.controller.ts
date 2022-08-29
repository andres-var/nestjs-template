import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { Auth } from 'src/auth/decorators';
import { Roles } from 'src/auth/interfaces';
import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@ApiBearerAuth()
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Auth(Roles.SUPER_ADMIN)
  @Get()
  runSeeds() {
    return this.seedsService.runSeeds();
  }
}
