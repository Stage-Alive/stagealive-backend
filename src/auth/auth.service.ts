import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthInterface } from './auth.interface';
import { UserEntity } from 'src/user/user.entity';
import { createHmac } from 'crypto';
import { ConfigConst } from 'src/constant/config.const';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async valideUser(data: Partial<AuthInterface>): Promise<UserEntity> {
    const email = data.email;
    const password = await createHmac(
      ConfigConst.CRIPTO_ALGORITHM,
      data.password,
    ).digest(ConfigConst.ENCODE_CRIPTO_ALGORITHM);

    const user = await this.userService.getUserByEmail(email);

    if (user.password == password) {
      return user;
    }
    return null;
  }
}
