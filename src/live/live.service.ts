import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { LiveEntity } from './live.entity';
import { LiveInterface } from './live.interface';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class LiveService {
  constructor(
    @InjectRepository(LiveEntity)
    private readonly liveRepository: Repository<LiveEntity>,
  ) {}

  async show(id: string): Promise<LiveEntity> {
    try {
      const group = await this.liveRepository.findOneOrFail(id);
      return group;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async restore(id: string): Promise<LiveEntity> {
    await this.liveRepository.restore(id);
    return this.show(id);
  }

  async destroy(id: string): Promise<boolean> {
    const result = await this.liveRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async store(data: Partial<LiveEntity>): Promise<LiveEntity> {
    const group = await this.liveRepository.create(data);
    return this.liveRepository.save(group);
  }

  async update(id: string, body: Partial<LiveInterface>): Promise<LiveEntity> {
    try {
      let live = await this.liveRepository.findOneOrFail(id);
      live = await this.liveRepository.merge(live, body);
      live = await this.liveRepository.save(live);
      return live;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<LiveEntity>> {
    return paginate<LiveEntity>(this.liveRepository, options);
  }
}
