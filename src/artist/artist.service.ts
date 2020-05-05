import { Injectable } from '@nestjs/common';
import { ArtistEntity } from './artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async store(data: Partial<ArtistEntity>): Promise<ArtistEntity> {
    const live = await this.artistRepository.create(data);
    return this.artistRepository.save(live);
  }
}
