import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';
import { MessagesService } from './messages.service';
import { Message } from '@prisma/client';

@WebSocketGateway({
  cors: { origin: '*' },
  transports: ['websocket'],
  namespace: 'messages',
})
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly messagesService: MessagesService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    Logger.log(`${client.id} is connected`);
    client.emit('message', 'Hello you are connected');
  }
  handleDisconnect(client: Socket) {
    Logger.log(`${client.id} is disconnected`);
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: Message,
    @ConnectedSocket() client: Socket,
  ) {
    const message = await this.messagesService.sendMessage(data);

    client.emit('message', message);
  }
}
