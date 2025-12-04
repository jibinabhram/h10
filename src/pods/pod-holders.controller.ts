import { Controller, Post, Body, Get, Param, Delete, UseGuards } from '@nestjs/common';
import { PodHoldersService } from './pod-holders.service';
import { CreatePodHolderDto } from './dto/create-pod-holder.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('pod-holders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PodHoldersController {
  constructor(private svc: PodHoldersService) {}

  @Post()
  @Roles('super_admin', 'club_admin')
  create(@Body() dto: CreatePodHolderDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }

  @Delete(':id')
  @Roles('super_admin')
  delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
