import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { hashPassword, comparePassword } from '../common/utils/password.util';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) {}

  async register(dto: { name?: string; email: string; phone?: string; password: string }) {
    const existing = await this.prisma.superAdmin.findUnique({ where: { email: dto.email } });
    if (existing) throw new UnauthorizedException('Email already exists');

    const password_hash = await hashPassword(dto.password);
    const created = await this.prisma.superAdmin.create({
      data: {
        name: dto.name,
        email: dto.email,
        phone: dto.phone,
        password_hash,
      },
    });
    delete (created as any).password_hash;
    return created;
  }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.superAdmin.findUnique({ where: { email } });
    if (!user) return null;
    const ok = await comparePassword(password, user.password_hash || '');
    if (!ok) return null;
    return user;
  }

  async login(dto: { email: string; password: string }) {
    const user = await this.validateUser(dto.email, dto.password);
    if (!user) throw new UnauthorizedException('Invalid credentials');
    const payload = { sub: user.super_admin_id, email: user.email, role: 'super_admin' };
    return { access_token: this.jwt.sign(payload) };
  }
}
