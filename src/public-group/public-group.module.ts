import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicGroupEntity } from './public-group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicGroupEntity])],
})
export class PublicGroupModule {}
