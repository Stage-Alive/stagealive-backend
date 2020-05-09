import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactFormEntity } from './contactform.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
import { ContactFormInterface } from './contactform.interface';

@Injectable()
export class ContactFormService {
  constructor(
    @InjectRepository(ContactFormEntity)
    private readonly contactFormRepository: Repository<ContactFormEntity>,
  ) {}

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<ContactFormEntity>> {
    return await paginate<ContactFormEntity>(this.contactFormRepository, options);
  }

  async show(id: string): Promise<ContactFormEntity> {
    try {
      const result = await this.contactFormRepository.findOneOrFail(id);
      return result;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async store(body: Partial<ContactFormInterface>): Promise<ContactFormEntity> {
    try {
      const entity = await this.contactFormRepository.create(body);
      return await this.contactFormRepository.save(entity);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
