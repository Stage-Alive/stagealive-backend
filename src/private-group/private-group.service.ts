import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PrivateGroupEntity } from './private-group.entity';
import { GroupService } from 'src/group/group.service';
import { PrivateGroupInterface } from './private-group.interface';

@Injectable()
export class PrivateGroupService {
  constructor(
    @InjectRepository(PrivateGroupEntity)
    private readonly privateGroupRepository: Repository<PrivateGroupEntity>,
    private readonly groupService: GroupService,
  ) {}

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<PrivateGroupEntity>> {
    return await paginate<PrivateGroupEntity>(
      this.privateGroupRepository,
      options,
    );
  }

  async restore(id: string): Promise<PrivateGroupEntity> {
    await this.privateGroupRepository.restore(id);
    const groupId = await (await this.privateGroupRepository.findOneOrFail(id))
      .group.id;
    await this.groupService.restore(groupId);
    return await this.show(id);
  }

  async show(id: string): Promise<PrivateGroupEntity> {
    try {
      // let result = await this.PrivateGroupRepository
      //   .createQueryBuilder('public_groups')
      //   .innerJoinAndSelect('public_groups.group', 'groups', 'groups.id')
      //   .where('public_groups.id =: id', { id: id })
      //   .getOne();
      let result = await this.privateGroupRepository.findOneOrFail(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async destroy(id: string) {
    try {
      const group = await (await this.privateGroupRepository.findOneOrFail(id))
        .group;
      const resultGroup = await this.groupService.destroy(group.id);
      const result = await this.privateGroupRepository.softDelete(id);
      return result.raw.affectedRows > 0 && resultGroup;
    } catch (error) {
      // await this.restore(id);
      // await this.groupService.restore(id);
      throw new InternalServerErrorException(error);
    }
  }

  async store(
    body: Partial<PrivateGroupInterface>,
  ): Promise<PrivateGroupEntity> {
    try {
      const groupEntity = await this.groupService.create(body);

      const privateGroupEntity = await this.privateGroupRepository.create();
      privateGroupEntity.group = groupEntity;

      return await this.privateGroupRepository.save(privateGroupEntity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    body: Partial<PrivateGroupInterface>,
  ): Promise<PrivateGroupEntity> {
    try {
      let privateGroup = await this.privateGroupRepository.findOneOrFail(id);
      await this.groupService.update(privateGroup.group, body);
      return privateGroup;
      //      return await this.privateGroupRepository.save(privateGroup);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  // async update(
  //   id: string,
  //   body: Partial<PrivateGroupInterface>,
  // ): Promise<PrivateGroupEntity> {
  //   try {
  //     let result = await this.privateGroupRepository.findOneOrFail(id);
  //     return await this.privateGroupRepository.save(
  //       await this.privateGroupRepository.merge(result, body),
  //     );
  //   } catch (error) {
  //     throw new InternalServerErrorException(error);
  //   }
  // }
}
