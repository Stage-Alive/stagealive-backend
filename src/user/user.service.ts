import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async restore(id: string): Promise<UserEntity> {
    await this.userRepository.restore(id);
    return await this.show(id);
  }

  async destroy(id: string) {
    try {
      const result = await this.userRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }


  async store(body: Partial<UserInterface>): Promise<UserEntity> {
    try {
      let user = await this.userRepository.create(body);
      user = await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async update(
    id: string,
    body: Partial<UserInterface>,
  ): Promise<UserEntity> {
    try {
      let user = await this.userRepository.findOneOrFail(id);
      user = await this.userRepository.merge(user, body);
      user = await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const result = await this.userRepository.softDelete(id);
      return result.raw.affectedRows > 0;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async show(id: string): Promise<UserEntity> {
    try {
      let user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
