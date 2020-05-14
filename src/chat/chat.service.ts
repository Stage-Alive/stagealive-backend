import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ChatEntity } from './chat.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ChatInterface } from './chat.interface';
import { async } from 'rxjs/internal/scheduler/async';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatEntity)
    private readonly chatRepository: Repository<ChatEntity>,
  ) {}

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<ChatEntity>> {
    return await paginate<ChatEntity>(this.chatRepository, options);
  }

  async store(data: Partial<ChatInterface>): Promise<ChatEntity> {
    const chat = this.chatRepository.create(data);
    return await this.chatRepository.save(chat);
  }

  async show(id: string): Promise<ChatEntity> {
    try {
      // const chat = await this.chatRepository.findOneOrFail(id, { relations: ['messages'] });
      return await this.chatRepository
        .createQueryBuilder('chats')
        .leftJoinAndSelect('chats.messages', 'messages')
        .limit(10)
        .orderBy('messages.createdAt', 'DESC')
        .where({ id })
        .getOne();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async restore(id: string): Promise<ChatEntity> {
    await this.chatRepository.restore(id);
    return await this.show(id);
  }

  async destroy(id: string): Promise<boolean> {
    const result = await this.chatRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async updateChatLives(groupsIds: string[], liveId: string) {
    await Promise.all(
      groupsIds.map(async groupId => {
        const chat = await this.chatRepository.findOneOrFail({ groupId: groupId });

        await this.chatRepository
          .createQueryBuilder()
          .relation(ChatEntity, 'live')
          .of(chat)
          .set(liveId);
      }),
    );
  }
}
