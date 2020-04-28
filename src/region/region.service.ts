import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionEntity } from './region.entity';
import { Repository } from 'typeorm';
import {
  paginate,
  IPaginationOptions,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { RegionInterface } from './region.interface';

@Injectable()
export class RegionService {
  constructor(
    @InjectRepository(RegionEntity)
    private readonly regionRepository: Repository<RegionEntity>,
  ) {}

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<RegionEntity>> {
    return await paginate<RegionEntity>(this.regionRepository, options);
  }

  async restore(id: string): Promise<RegionEntity> {
    await this.regionRepository.restore(id);
    return await this.show(id);
  }

  async show(id: string): Promise<RegionEntity> {
    try {
      let result = await this.regionRepository.findOneOrFail(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async destroy(id: string) {
    try {
      const result = await this.regionRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async store(body: Partial<RegionInterface>): Promise<RegionEntity> {
    try {
      return await this.regionRepository.save(
        await this.regionRepository.create(body),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    body: Partial<RegionInterface>,
  ): Promise<RegionEntity> {
    try {
      let result = await this.regionRepository.findOneOrFail(id);
      return await this.regionRepository.save(
        await this.regionRepository.merge(result, body),
      );
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

    async delete(id: string): Promise<boolean> {
      try {
        const result = await this.regionRepository.softDelete(id);
        return result.raw.affectedRows > 0;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    }
}
