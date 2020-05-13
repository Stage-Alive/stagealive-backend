import { Injectable, InternalServerErrorException, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { UserInterface } from './user.interface';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { paginate, Pagination, IPaginationOptions } from 'nestjs-typeorm-paginate';
import { createHmac } from 'crypto';
import { ConfigConst } from 'src/constant/config.const';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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

  private enoughParams(body: Partial<UserInterface>): boolean {
    if ((body.facebookId && body.name && body.email) || (body.password && body.email)) {
      return true;
    }
    return false;
  }

  async store(body: Partial<UserInterface>): Promise<any> {
    if (this.enoughParams(body)) {
      let user = await this.userRepository.create(body);
      user = await this.userRepository.save(user);
      const userStr = JSON.stringify(user);
      const data = {
        ...user,
        access_token: this.jwtService.sign(userStr),
      };
      return data;
    } else {
      throw new BadRequestException('Must contain a {facebookId, name, email} or {email and password}');
    }
  }

  private async checkEmailOwner(id: string, email: string) {
    const user = await this.userRepository
      .createQueryBuilder('users')
      .where('users.id = :id', { id: id })
      .andWhere('users.email = :email', { email: email })
      .getOne();

    if (!user) {
      return true;
    }
    return false;
  }

  async update(id: string, body: Partial<UserInterface>): Promise<UserEntity> {
    try {
      let user = await this.userRepository.findOneOrFail(id);
      this.userRepository.merge(user, body);
      await this.userRepository.save(user);
      return await this.show(id);
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
      const user = await this.userRepository.findOneOrFail(id);
      return user;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async paginate(options: IPaginationOptions = { page: 1, limit: 10 }): Promise<Pagination<UserEntity>> {
    return await paginate<UserEntity>(this.userRepository, options);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOneOrFail({ email });
  }

  async getUserByFacebookId(facebookId: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ facebookId });
  }
}
