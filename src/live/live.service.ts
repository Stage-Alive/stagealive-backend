import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { LiveEntity } from './live.entity';
import { LiveInterface } from './live.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { GroupEntity } from 'src/group/group.entity';

@Injectable()
export class LiveService {
  constructor(
    @InjectRepository(LiveEntity)
    private readonly liveRepository: Repository<LiveEntity>,
  ) {}

  async show(id: string): Promise<LiveEntity> {
    try {
      return await this.liveRepository.findOneOrFail(id);
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
    await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'artists')
      .of(id)
      .set(null);
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
        .set(data.artistsIds);
    }
    return live;
  }

  async update(id: string, body: Partial<LiveInterface>): Promise<LiveEntity> {
    try {
      let live = await this.liveRepository.findOneOrFail(id);
      live = await this.liveRepository.merge(live, body);

      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'artists')
        .of(id)
        .set(null);

      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'artists')
        .of(id)
        .set(body.artistsIds);

      return await this.liveRepository.save(live);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<LiveEntity>> {
    return paginate<LiveEntity>(this.liveRepository, options);
  }

  async watch(id: string, request: any): Promise<Boolean> {
    const userId = request.user.id;
    try {
      await this.liveRepository
        .createQueryBuilder()
        .relation(GroupEntity, 'users')
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
