import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/group/group.entity';
import { GroupService } from 'src/group/group.service';
import { PrivateGroupController } from './private-group.controller';
import { PrivateGroupEntity } from './private-group.entity';
import { PrivateGroupService } from './private-group.service';
import { UserModule } from 'src/user/user.module';
import { ChatService } from 'src/chat/chat.service';
import { ChatEntity } from 'src/chat/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateGroupEntity, ChatEntity, GroupEntity]), UserModule],
  providers: [PrivateGroupService, GroupService, ChatService],
  controllers: [PrivateGroupController],
  exports: [PrivateGroupService, GroupService, ChatService],
})
export class PrivateGroupModule {}
