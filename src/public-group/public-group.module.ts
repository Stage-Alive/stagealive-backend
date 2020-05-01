import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicGroupEntity } from './public-group.entity';
import { PublicGroupService } from './public-group.service';
import { GroupService } from 'src/group/group.service';
import { PublicGroupController } from './public-group.controller';
import { GroupEntity } from 'src/group/group.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PublicGroupEntity, GroupEntity]),
    UserModule,
  ],
  providers: [GroupService, PublicGroupService],
  controllers: [PublicGroupController],
  exports: [PublicGroupService, GroupService],
})
export class PublicGroupModule {}
