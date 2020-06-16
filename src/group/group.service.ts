import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PublicGroupEntity } from 'src/public-group/public-group.entity';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { GroupInterface } from './group.interface';
import shortid = require('shortid');

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
      const group = await this.groupRepository.findOneOrFail(id, { relations: ['users'] });
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

  private async updateGroupsLives(groupId: string, liveId: string) {
    if (liveId) {
      await this.groupRepository
        .createQueryBuilder()
        .relation(GroupEntity, 'lives')
        .of(groupId)
        .add(liveId);
    }
  }
  async create(data: Partial<GroupInterface>): Promise<GroupEntity> {
    let group = this.groupRepository.create(data);
    group.invitationtId = shortid.generate();
    group = await this.groupRepository.save(group);
    await this.updateGroupsLives(group.id, data.liveId);
    return group;
  }

  async update(group: GroupEntity, data: Partial<GroupInterface>): Promise<GroupEntity> {
    group = this.groupRepository.merge(group, data);
    await this.groupRepository.save(group);
    await this.updateGroupsLives(group.id, data.liveId);
    return group;
  }

  async subscribe(userId: string, id: string): Promise<Boolean> {
    try {
      await this.groupRepository
        .createQueryBuilder()
        .relation(GroupEntity, 'users')
        .of(id)
        .remove(userId);

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

  async subscribeInAllPublicGroups(userId: string, liveId: string) {
    const allPublicGroups = await this.groupRepository
      .createQueryBuilder('groups')
      .leftJoin('groups.lives', 'lives')
      .where('lives.id = :liveId', { liveId: liveId })
      .innerJoin(PublicGroupEntity, 'public_groups', 'public_groups.group_id = groups.id')
      .printSql()
      .getMany();

    await Promise.all(
      allPublicGroups.map(async group => {
        await this.subscribe(userId, group.id);
      }),
    );
  }
}
