import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePodHolderDto } from './dto/create-pod-holder.dto';

@Injectable()
export class PodHoldersService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreatePodHolderDto) {
    return this.prisma.podHolder.create({
      data: {
        serial_number: dto.serial_number,
        model: dto.model,
      },
    });
  }

  async findAll() {
    return this.prisma.podHolder.findMany();
  }

  async findOne(id: string) {
    const ph = await this.prisma.podHolder.findUnique({ where: { pod_holder_id: id } });
    if (!ph) throw new NotFoundException('Pod holder not found');
    return ph;
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.podHolder.delete({ where: { pod_holder_id: id } });
  }
}
