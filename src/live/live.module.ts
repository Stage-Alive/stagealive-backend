import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveEntity } from './live.entity';
import { LiveService } from './live.service';
import { LiveController } from './live.controller';
import { ChatService } from 'src/chat/chat.service';
import { ChatEntity } from 'src/chat/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LiveEntity, ChatEntity])],
  controllers: [LiveController],
  providers: [LiveService, ChatService],
  exports: [LiveService],
})
export class LiveModule {}
