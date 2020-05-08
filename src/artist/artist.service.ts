import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { IPaginationOptions } from 'nestjs-typeorm-paginate/dist/interfaces';
import { Repository } from 'typeorm';
import { ArtistEntity } from './artist.entity';
import { ArtistInterface } from './artist.interface';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(ArtistEntity)
    private readonly artistRepository: Repository<ArtistEntity>,
  ) {}

  async store(data: Partial<ArtistInterface>): Promise<ArtistEntity> {
    const live = await this.artistRepository.create(data);
    return this.artistRepository.save(live);
  }

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<ArtistEntity>> {
    return paginate<ArtistEntity>(this.artistRepository, options);
  }

  async destroy(id: string): Promise<boolean> {
    const result = await this.artistRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async show(id: string): Promise<ArtistEntity> {
    try {
      return await this.artistRepository.findOneOrFail(id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async restore(id: string): Promise<ArtistEntity> {
    await this.artistRepository.restore(id);
    return this.show(id);
  }

  async update(
    id: string,
    body: Partial<ArtistInterface>,
  ): Promise<ArtistEntity> {
    try {
      let artist = await this.artistRepository.findOneOrFail(id);
      artist = await this.artistRepository.merge(artist, body);

      return await this.artistRepository.save(artist);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
