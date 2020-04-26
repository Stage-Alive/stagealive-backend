import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { GroupEntity } from './group.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GroupService {
  create(name: string): GroupEntity {
      throw new Error("Method not implemented.");
  }
  async destroyByPublicGroupId(id: string): Promise<boolean> {
      throw new Error("Method not implemented.");
  }
  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
  ) {}
}
