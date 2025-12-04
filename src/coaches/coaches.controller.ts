import { Controller, Post, Body, Get } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { CreateCoachDto } from './dto/create-coach.dto';

@Controller('coaches')
export class CoachesController {
  constructor(private svc: CoachesService) {}

  @Post()
  create(@Body() dto: CreateCoachDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }
}
