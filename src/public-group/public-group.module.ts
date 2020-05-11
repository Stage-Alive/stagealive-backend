import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicGroupEntity } from './public-group.entity';
import { PublicGroupService } from './public-group.service';
import { GroupService } from 'src/group/group.service';
import { PublicGroupController } from './public-group.controller';
import { GroupEntity } from 'src/group/group.entity';
import { UserModule } from 'src/user/user.module';
import { ChatEntity } from 'src/chat/chat.entity';
import { ChatService } from 'src/chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([PublicGroupEntity, ChatEntity, GroupEntity]), UserModule],
  providers: [GroupService, PublicGroupService, ChatService],
  controllers: [PublicGroupController],
  exports: [PublicGroupService, GroupService, ChatService],
})
export class PublicGroupModule {}
