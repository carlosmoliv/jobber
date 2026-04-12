import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '../../generated/prisma/client';
import { hash } from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await hash(data.password, 10);
    return this.prismaService.user.create({
      data: { ...data, password: hashedPassword },
    });
  }

  async getUsers() {
    return this.prismaService.user.findMany();
  }
}
