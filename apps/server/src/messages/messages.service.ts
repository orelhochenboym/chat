import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getMessages() {
    return this.prisma.message.findMany();
  }

  async sendMessage(message: string) {
    return this.prisma.message.create({ data: { message } });
  }
}
