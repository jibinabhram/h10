import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClubsService {
  constructor(private prisma: PrismaService) {}

  create(super_admin_id: string | null, dto: any) {
    return this.prisma.club.create({
      data: {
        super_admin_id,
        club_name: dto.club_name,
        address: dto.address,
      },
    });
  }

  findAll() {
    return this.prisma.club.findMany();
  }

  findOne(id: string) {
    return this.prisma.club.findUnique({ where: { club_id: id } });
  }
}
