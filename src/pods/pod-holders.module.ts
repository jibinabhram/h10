import { Module } from '@nestjs/common';
import { PodHoldersController } from './pod-holders.controller';
import { PodHoldersService } from './pod-holders.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [PodHoldersController],
  providers: [PodHoldersService],
  exports: [PodHoldersService],
})
export class PodHoldersModule {}
