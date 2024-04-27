import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';
import { PrismaModule } from '../prisma/prisma.module';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';

@Module({
  imports: [PrismaModule],
  controllers: [MessagesController],
  providers: [MessagesGateway, MessagesService],
  exports: [],
})
export class MessagesModule {}
