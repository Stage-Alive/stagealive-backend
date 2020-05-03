import { Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArtistEntity])],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
