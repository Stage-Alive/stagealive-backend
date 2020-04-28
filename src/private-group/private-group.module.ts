import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupEntity } from 'src/group/group.entity';
import { GroupService } from 'src/group/group.service';
import { PrivateGroupController } from './private-group.controller';
import { PrivateGroupEntity } from './private-group.entity';
import { PrivateGroupService } from './private-group.service';

@Module({
  imports: [TypeOrmModule.forFeature([PrivateGroupEntity, GroupEntity])],
  providers: [PrivateGroupService, GroupService],
  controllers: [PrivateGroupController],
  exports: [PrivateGroupService, GroupService],
})
export class PrivateGroupModule {}
