import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupService } from 'src/group/group.service';
import { Repository } from 'typeorm';
import { PublicGroupEntity } from './public-group.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { PublicGroupInterface } from './public-group.interface';
import { ChatService } from 'src/chat/chat.service';

@Injectable()
export class PublicGroupService {
  constructor(
    @InjectRepository(PublicGroupEntity)
    private readonly publicGroupRepository: Repository<PublicGroupEntity>,
    private readonly groupService: GroupService,
    private readonly chatService: ChatService,
  ) {}

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<PublicGroupEntity>> {
    return await paginate<PublicGroupEntity>(this.publicGroupRepository, options);
  }

  async restore(id: string): Promise<PublicGroupEntity> {
    await this.publicGroupRepository.restore(id);
    const groupId = await (await this.publicGroupRepository.findOneOrFail(id)).group.id;
    await this.groupService.restore(groupId);
    return await this.show(id);
  }

  async show(id: string): Promise<PublicGroupEntity> {
    try {
      const result = await this.publicGroupRepository.findOneOrFail(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async destroy(id: string) {
    try {
      const group = await (await this.publicGroupRepository.findOneOrFail(id)).group;
      const resultGroup = await this.groupService.destroy(group.id);
      const result = await this.publicGroupRepository.softDelete(id);
      return result.raw.affectedRows > 0 && resultGroup;
    } catch (error) {
      // await this.restore(id);
      // await this.groupService.restore(id);
      throw new InternalServerErrorException(error);
    }
  }

  async store(body: PublicGroupInterface): Promise<PublicGroupEntity> {
    try {
      let publicGroupEntity = this.publicGroupRepository.create();
      publicGroupEntity = await this.publicGroupRepository.save(publicGroupEntity);

      const groupEntity = await this.groupService.create(body);

      await this.publicGroupRepository
        .createQueryBuilder()
        .relation(PublicGroupEntity, 'group')
        .of(publicGroupEntity)
        .set(groupEntity);

      await this.publicGroupRepository
        .createQueryBuilder()
        .relation(PublicGroupEntity, 'region')
        .of(publicGroupEntity)
        .set(body.regionId);

      // if (body.liveId) {
      await this.chatService.store({ groupId: groupEntity.id });
      // }
      return await this.show(publicGroupEntity.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(id: string, body: PublicGroupInterface): Promise<PublicGroupEntity> {
    try {
      let publicGroup = await this.publicGroupRepository.findOneOrFail(id);
      publicGroup = await this.publicGroupRepository.merge(publicGroup, body);
      await this.groupService.update(publicGroup.group, body);
      return await this.publicGroupRepository.save(publicGroup);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.publicGroupRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
