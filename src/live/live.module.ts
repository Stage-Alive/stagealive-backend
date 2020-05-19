import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatEntity } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';
import { GroupEntity } from 'src/group/group.entity';
import { GroupService } from 'src/group/group.service';
import { LiveController } from './live.controller';
import { LiveEntity } from './live.entity';
import { LiveService } from './live.service';

@Module({
  imports: [TypeOrmModule.forFeature([LiveEntity, ChatEntity, GroupEntity])],
  controllers: [LiveController],
  providers: [LiveService, ChatService, GroupService],
  exports: [LiveService],
})
export class LiveModule {}
