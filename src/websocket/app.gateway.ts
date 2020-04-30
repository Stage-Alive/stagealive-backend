import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { MessageService } from '../message/message.service';
import { MessageEntity } from 'src/message/message.entity';

@WebSocketGateway()
export class AppGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly messageService: MessageService) {}

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');

  @SubscribeMessage('msgToServer')
  handleMessage(
    client: Socket,
    payload: { name: string; text: string; chat: string; userId: string },
  ): void {
    this.server.to(payload.chat).emit('msgToClient', payload);
    this.messageService.store({
      chatId: payload.chat,
      userId: payload.userId,
      text: payload.text,
    });
  }

  @SubscribeMessage('join')
  handleJoinChat(client: Socket, chat: string) {
    client.join(chat);
    client.emit('joinedChat', chat);
  }

  @SubscribeMessage('leave')
  handleLeaveChat(client: Socket, chat: string) {
    client.leave(chat);
    client.emit('leavedChat', chat);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`Client connected: ${client.id}`);
  }
}
