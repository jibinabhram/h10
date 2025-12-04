import { Controller, Post, Body, Get } from '@nestjs/common';
import { ClubAdminService } from './club-admin.service';
import { CreateClubAdminDto } from './dto/create-club-admin.dto';

@Controller('club-admin')
export class ClubAdminController {
  constructor(private svc: ClubAdminService) {}

  @Post()
  create(@Body() dto: CreateClubAdminDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }
}
