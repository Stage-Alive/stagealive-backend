import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { GroupInterface } from './group.interface';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<GroupEntity>> {
    return await paginate<GroupEntity>(this.groupRepository, options);
  }

  async show(id: string): Promise<GroupEntity> {
    try {
      const group = await this.groupRepository.findOneOrFail(id);
      return group;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async restore(id: string): Promise<GroupEntity> {
    await this.groupRepository.restore(id);
    return await this.show(id);
  }

  async destroy(id: string): Promise<boolean> {
    const result = await this.groupRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async create(data: Partial<GroupInterface>): Promise<GroupEntity> {
    let group = this.groupRepository.create(data);
    group = await this.groupRepository.save(group);

    if (data.liveId) {
      await this.groupRepository
        .createQueryBuilder()
        .relation(GroupEntity, 'lives')
        .of(group)
        .add(data.liveId);
    }

    return group;
  }

  async update(group: GroupEntity, data: Partial<GroupEntity>): Promise<GroupEntity> {
    group = await this.groupRepository.merge(group, data);
    return await this.groupRepository.save(group);
  }

  async subscribe(request: any, id: string): Promise<Boolean> {
    const userId = request.user.id;
    try {
      await this.groupRepository
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

  async unsubscribe(request: any, id: string): Promise<Boolean> {
    const userId = request.user.id;
    try {
      await this.groupRepository
        .createQueryBuilder()
        .relation(GroupEntity, 'users')
        .of(id)
        .remove(userId);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
