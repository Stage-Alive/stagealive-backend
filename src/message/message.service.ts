import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MessageEntity } from './message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async paginate(
    options: IPaginationOptions = { page: 1, limit: 10 },
  ): Promise<Pagination<MessageEntity>> {
    return await paginate<MessageEntity>(this.messageRepository, options);
  }

  async show(id: string): Promise<MessageEntity> {
    try {
      const message = await this.messageRepository.findOneOrFail(id);
      return message;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async restore(id: string): Promise<MessageEntity> {
    await this.messageRepository.restore(id);
    return await this.show(id);
  }

  async destroy(id: string): Promise<boolean> {
    const result = await this.messageRepository.softDelete(id);
    return result.raw.affectedRows > 0;
  }

  async store(data: Partial<MessageEntity>): Promise<MessageEntity> {
    const message = await this.messageRepository.create(data);
    return await this.messageRepository.save(message);
  }
}
