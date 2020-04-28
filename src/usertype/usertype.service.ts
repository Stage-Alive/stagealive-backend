import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTypeEntity } from './usertype.entity';
import { Repository } from 'typeorm';
import { UserTypeInterface } from './usertype.interface';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class UserTypeService {
  constructor(
    @InjectRepository(UserTypeEntity)
    private readonly userTypeRepository: Repository<UserTypeEntity>,
  ) {}

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<UserTypeEntity>> {
    return await paginate<UserTypeEntity>(this.userTypeRepository, options);
  }

  async restore(id: string): Promise<UserTypeEntity> {
    await this.userTypeRepository.restore(id);
    return await this.show(id);
  }

  async destroy(id: string) {
    try {
      const result = await this.userTypeRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async store(body: Partial<UserTypeInterface>): Promise<UserTypeEntity> {
    try {
      let user = await this.userTypeRepository.create(body);
      user = await this.userTypeRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    body: Partial<UserTypeInterface>,
  ): Promise<UserTypeEntity> {
    try {
      let user = await this.userTypeRepository.findOneOrFail(id);
      user = await this.userTypeRepository.merge(user, body);
      user = await this.userTypeRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.userTypeRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async show(id: string): Promise<UserTypeEntity> {
    try {
      let user = await this.userTypeRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
