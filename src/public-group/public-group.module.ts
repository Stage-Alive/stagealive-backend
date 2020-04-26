import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicGroupEntity } from './public-group.entity';
import { PublicGroupService } from './public-group.service';
import { GroupService } from 'src/group/group.service';
import { PublicGroupController } from './public-group.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PublicGroupEntity])],
  providers: [GroupService, PublicGroupService],
  controllers: [PublicGroupController],
  exports: [PublicGroupService]
})
export class PublicGroupModule {}
