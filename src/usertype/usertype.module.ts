import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserTypeEntity } from './usertype.entity';
import { UserTypeController } from './usertype.controller';
import { UserTypeService } from './usertype.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserTypeEntity])],
  controllers: [UserTypeController],
  providers: [UserTypeService],
  exports: [UserTypeService],
})
export class UserTypeModule {}
