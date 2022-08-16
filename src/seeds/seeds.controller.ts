import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SeedsService } from './seeds.service';

@ApiTags('Seeds')
@Controller('seeds')
export class SeedsController {
  constructor(private readonly seedsService: SeedsService) {}

  @Get()
  runSeeds() {
    return this.seedsService.runSeeds();
  }
}
