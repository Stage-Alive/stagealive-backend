import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { LiveEntity } from './live.entity';
import { LiveInterface } from './live.interface';

@Injectable()
export class LiveService {
  constructor(
    @InjectRepository(LiveEntity)
    private readonly liveRepository: Repository<LiveEntity>,
  ) {}

  async show(id: string): Promise<LiveEntity> {
    try {
      return await this.liveRepository.findOneOrFail(id, {
        relations: ['artists'],
      });
      // return group;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async restore(id: string): Promise<LiveEntity> {
    await this.liveRepository.restore(id);
    return this.show(id);
  }

  async destroy(id: string): Promise<boolean> {
    await this.removeArtists(id);
    const result = await this.liveRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async store(data: Partial<LiveInterface>): Promise<LiveEntity> {
    const live = await this.liveRepository.create(data);
    await this.liveRepository.save(live);

    if (data.artistsIds) {
      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'artists')
        .of(live.id)
        .add(data.artistsIds);
    }
    return await this.show(live.id);
  }

  private async removeArtists(id: string) {
    const allArtists = await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'artists')
      .of(id)
      .loadMany();

    await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'artists')
      .of(id)
      .remove(allArtists);
  }
  async update(id: string, body: Partial<LiveInterface>): Promise<LiveEntity> {
    try {
      let live = await this.liveRepository.findOneOrFail(id);

      await this.removeArtists(id);
      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'artists')
        .of(id)
        .add(body.artistsIds);

      live = await this.liveRepository.merge(live, body);

      return await this.liveRepository.save(live);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<LiveEntity>> {
    return paginate<LiveEntity>(this.liveRepository, options, {
      relations: ['artists'],
    });
  }

  async watch(id: string, request: any): Promise<Boolean> {
    const userId = request.user.id;
    try {
      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'users')
        .of(id)
        .add(userId);
    } catch (error) {
      if (error.code != 'ER_DUP_ENTRY') {
        throw new UnauthorizedException(error);
      }
    }
    return true;
  }
}
