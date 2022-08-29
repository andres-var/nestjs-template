import { Module } from '@nestjs/common';
import { SeedsService } from './seeds.service';
import { SeedsController } from './seeds.controller';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedsController],
  providers: [SeedsService],
  imports: [UsersModule, AuthModule, CommonModule],
})
export class SeedsModule {}
