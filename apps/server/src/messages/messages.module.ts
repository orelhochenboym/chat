import { Module } from '@nestjs/common';
import { MessagesGateway } from './messages.gateway';

@Module({
  imports: [],
  controllers: [],
  providers: [MessagesGateway],
  exports: [],
})
export class MessagesModule {}
