import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ClubsService } from './clubs.service';
import { CreateClubDto } from './dto/create-club.dto';

@Controller('clubs')
export class ClubsController {
  constructor(private svc: ClubsService) {}

  @Post()
  create(@Body() dto: CreateClubDto) {
    // provide super_admin_id if available in auth; for now null
    return this.svc.create(null, dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.svc.findOne(id);
  }
}
