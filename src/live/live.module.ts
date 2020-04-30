import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LiveEntity } from './live.entity';
import { LiveService } from './live.service';
import { LiveController } from './live.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LiveEntity])],
  controllers: [LiveController],
  providers: [LiveService],
  exports: [LiveService],
})
export class LiveModule {}
