import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { ConfigConst } from 'src/constant/config.const';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthInterface } from './auth.interface';
@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async valideUser(data: Partial<AuthInterface>): Promise<UserEntity> {
    if (data.facebookId) {
      const user = await this.userService.getUserByFacebookId(data.facebookId);
      return user;
    }

    const email = data.email;
    const password = await createHmac(ConfigConst.CRIPTO_ALGORITHM, data.password).digest(
      ConfigConst.ENCODE_CRIPTO_ALGORITHM,
    );

    const user = await this.userService.getUserByEmail(email);

    if (user.password == password) {
      return user;
    }
    return null;
  }

  async login(data: Partial<AuthInterface>) {
    const user = await this.valideUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return { access_token: this.jwtService.sign(data) };
  }

  async loginFacebook(data: Partial<AuthInterface>) {
    const user = await this.valideUser(data);
    if (!user) {
      data.userTypeId = ConfigConst.USER_TYPE_CONSUMER;
      return this.userService.store(data);
    }
  }

  me(request: any) {
    return request.user;
  }
}
