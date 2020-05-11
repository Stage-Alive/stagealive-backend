import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    private readonly userService: UserService,
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

  async create(data: Partial<GroupEntity>): Promise<GroupEntity> {
    const group = await this.groupRepository.create(data);
    return await this.groupRepository.save(group);
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
  // async invite(request: any, id: string): Promise<GroupEntity> {
  //   const userId = request.user.id;

  //   const user = await this.userService.show(userId);
  //   const group = await this.show(id);
  //   const userOnGroup = await group.users;
  //   userOnGroup.push(user);
  //   group.users = userOnGroup;
  //   return await this.groupRepository.save(group);
  // }
}
