import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { createHmac } from 'crypto';
import { ConfigConst } from 'src/constant/config.const';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthInterface } from './auth.interface';
import { ForgetDto } from './dtos/forget.dto';
import { ResetDto } from './dtos/reset.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async valideUser(data: Partial<AuthInterface>): Promise<UserEntity> {
    if (data.facebookId) {
      const user = await this.userService.getUserByFacebookId(data.facebookId);
      return user;
    } else if (data.email) {
      const user = await this.userService.getUserByEmail(data.email);
      return user;
    }

    return null;
  }

  async login(data: Partial<AuthInterface>) {
    const user = await this.valideUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return this.generateUserToken(user);
  }

  async loginFacebook(data: Partial<AuthInterface>) {
    const user = await this.valideUser(data);
    if (!user) {
      data.userTypeId = ConfigConst.USER_TYPE_CONSUMER;
      return this.userService.store(data);
    }
    return this.generateUserToken(user);
  }

  async me(request: any) {
    const email = request.user.email;
    const user = await this.userService.getUserByEmail(email);
    user.password = null;
    return user;
  }

  async forget(body: ForgetDto) {
    return this.userService.forget(body.email);
  }

  async reset(body: ResetDto) {
    return this.userService.reset(body.rememberToken, body.password);
  }

  generateUserToken(user: UserEntity) {
    const token = this.jwtService.sign({ email: user.email });
    return { access_token: token };
  }
}
