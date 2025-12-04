import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoachesService {
  constructor(private prisma: PrismaService) {}

  create(dto: any) {
    return this.prisma.coach.create({
      data: {
        coach_name: dto.coach_name,
        email: dto.email,
        phone: dto.phone,
        club_id: dto.club_id,
      },
    });
  }

  findAll() {
    return this.prisma.coach.findMany();
  }
}
