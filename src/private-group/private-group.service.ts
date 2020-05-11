import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { PrivateGroupEntity } from './private-group.entity';
import { GroupService } from 'src/group/group.service';
import { PrivateGroupInterface } from './private-group.interface';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class PrivateGroupService {
  constructor(
    @InjectRepository(PrivateGroupEntity)
    private readonly privateGroupRepository: Repository<PrivateGroupEntity>,
    private readonly groupService: GroupService,
    private readonly chatService: ChatService,
  ) {}

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<PrivateGroupEntity>> {
    return await paginate<PrivateGroupEntity>(this.privateGroupRepository, options);
  }

  async restore(id: string): Promise<PrivateGroupEntity> {
    await this.privateGroupRepository.restore(id);
    const groupId = await (await this.privateGroupRepository.findOneOrFail(id)).group.id;
    await this.groupService.restore(groupId);
    return await this.show(id);
  }

  async show(id: string): Promise<PrivateGroupEntity> {
    try {
      const result = await this.privateGroupRepository.findOneOrFail(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async destroy(id: string) {
    try {
      const group = await (await this.privateGroupRepository.findOneOrFail(id)).group;
      const resultGroup = await this.groupService.destroy(group.id);
      const result = await this.privateGroupRepository.softDelete(id);
      return result.raw.affectedRows > 0 && resultGroup;
    } catch (error) {
      // await this.restore(id);
      // await this.groupService.restore(id);
      throw new InternalServerErrorException(error);
    }
  }

  async store(body: PrivateGroupInterface, userId: string): Promise<PrivateGroupEntity> {
    try {
      let privateGroupEntity = this.privateGroupRepository.create();
      privateGroupEntity = await this.privateGroupRepository.save(privateGroupEntity);

      const groupEntity = await this.groupService.create(body);

      await this.privateGroupRepository
        .createQueryBuilder()
        .relation(PrivateGroupEntity, 'group')
        .of(privateGroupEntity)
        .set(groupEntity);

      await this.privateGroupRepository
        .createQueryBuilder()
        .relation(PrivateGroupEntity, 'createdBy')
        .of(privateGroupEntity)
        .set(userId);

      await this.chatService.store({ liveId: body.liveId, groupId: groupEntity.id });

      return await this.show(privateGroupEntity.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, body: Partial<PrivateGroupInterface>): Promise<PrivateGroupEntity> {
    try {
      const privateGroup = await this.privateGroupRepository.findOneOrFail(id);
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
