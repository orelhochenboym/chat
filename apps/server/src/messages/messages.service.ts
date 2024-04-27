import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Message } from '@prisma/client';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getMessages() {
    return this.prisma.message.findMany();
  }

  async sendMessage(data: Message) {
    return this.prisma.message.create({ data });
  }
}
