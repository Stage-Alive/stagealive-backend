import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}

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
    let group = await this.groupRepository.create(data);
    return await this.groupRepository.save(group);
  }
}
