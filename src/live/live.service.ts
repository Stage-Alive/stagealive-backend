import { Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { ChatService } from 'src/chat/chat.service';
import { GroupService } from 'src/group/group.service';
import { Repository } from 'typeorm';
import { LiveEntity } from './live.entity';
import { IndexLiveInterface } from './live.index.interface';
import { LiveInterface } from './live.interface';
import shortid = require('shortid');

@Injectable()
export class LiveService {
  constructor(
    @InjectRepository(LiveEntity)
    private readonly liveRepository: Repository<LiveEntity>,
    private readonly chatService: ChatService,
    private readonly groupService: GroupService,
  ) {}

  // TO DO: review this implementation
  async show(id: string, userId?: string): Promise<LiveEntity> {
    await this.watch(id, userId);
    // SELECT lives.id as lives_id, groups.name as groups_name
    // from
    // lives
    // inner join groups_lives on groups_lives.live_id = lives.id
    // inner join groups on groups.id = groups_lives.group_id
    // inner join groups_users on groups_users.group_id  = groups.id
    // where lives.id = '1a4c6ba2-9075-44a1-ad5e-bd5b96fbc923'
    // and groups_users.user_id = 'e9fd1b7f-e323-42f9-a7e2-b18c6fafc9f2'

    try {
      const live = await this.liveRepository
        .createQueryBuilder('lives')
        .innerJoinAndSelect('lives.groups', 'groups')
        .innerJoin('groups.users', 'users')
        .leftJoinAndSelect('groups.chats', 'chats')
        .leftJoinAndSelect('chats.messages', 'messages')
        // .limit(10)
        // .orderBy('messages.created_at', 'DESC')
        // .orderBy('groups.created_at', 'DESC')
        .where('lives.id = :id', { id: id })
        .andWhere('users.id = :userId', { userId: userId })
        .printSql()
        .getOne();

      // let chats = live.chats.map(async chat => {});
      return live;
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async restore(id: string, userId: string): Promise<LiveEntity> {
    await this.liveRepository.restore(id);
    return this.show(id, userId);
  }

  async destroy(id: string): Promise<boolean> {
    await this.removeArtists(id);
    const result = await this.liveRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async store(data: Partial<LiveInterface>, userId: string): Promise<LiveEntity> {
    const live = this.liveRepository.create(data);
    live.invitationtId = shortid.generate();

    await this.liveRepository.save(live);
    const id = live.id;

    await this.updateArtists(id, data.artistsIds);
    await this.updateGroups(id, data.groupsIds);

    return await this.show(id, userId);
  }

  private async removeArtists(id: string) {
    const allArtists = await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'artists')
      .of(id)
      .loadMany();

    await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'artists')
      .of(id)
      .remove(allArtists);
  }

  private async updateArtists(id: string, artistsIds: string[]) {
    if (artistsIds) {
      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'artists')
        .of(id)
        .add(artistsIds);
    }
  }

  private async updateGroups(id: string, groupsIds: string[]) {
    if (groupsIds) {
      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'groups')
        .of(id)
        .add(groupsIds);

      await this.chatService.updateChatLives(groupsIds, id);
    }
  }

  private async removeGroups(id: string) {
    const allGroups = await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'groups')
      .of(id)
      .loadMany();

    await this.liveRepository
      .createQueryBuilder()
      .relation(LiveEntity, 'groups')
      .of(id)
      .remove(allGroups);

    await this.chatService.removeChatLives(allGroups, id);
  }

  async update(id: string, body: Partial<LiveInterface>, userId: string): Promise<LiveEntity> {
    try {
      let live = await this.liveRepository.findOneOrFail(id);

      await this.removeArtists(id);
      await this.updateArtists(id, body.artistsIds);

      await this.removeGroups(id);
      await this.updateGroups(id, body.groupsIds);

      live = this.liveRepository.merge(live, body);

      await this.liveRepository.save(live);

      return await this.liveRepository.findOne(live.id);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async patchLive(id: string, body: Partial<LiveInterface>) {
    try {
      const live = await this.liveRepository.findOneOrFail(id);
      live.highlighted = body.highlighted;
      return await this.liveRepository.save(live);
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async paginate(
    options: IndexLiveInterface = { page: 1, limit: 10, highlighted: null },
  ): Promise<Pagination<LiveEntity>> {
    const { page, limit, highlighted } = options;

    const queryBuilder = this.liveRepository.createQueryBuilder('lives');

    if (highlighted) {
      queryBuilder.where({ highlighted: highlighted });
    }
    queryBuilder.orderBy('lives.start_at', 'DESC');

    return await paginate<LiveEntity>(queryBuilder, { page: page || 1, limit: limit || 10 });
  }

  async watch(id: string, userId: string): Promise<boolean> {
    try {
      await this.groupService.subscribeInAllPublicGroups(userId, id);

      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'users')
        .of(id)
        .remove(userId);

      await this.liveRepository
        .createQueryBuilder()
        .relation(LiveEntity, 'users')
        .of(id)
        .add(userId);
    } catch (error) {
      if (error.code != 'ER_DUP_ENTRY') {
        throw new UnauthorizedException(error);
      }
    }
    return true;
  }
}
