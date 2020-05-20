import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthInterface } from './auth.interface';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigConst } from 'src/constant/config.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: ConfigConst.JWT_SECRET,
    });
  }

  async validate(data: AuthInterface): Promise<UserEntity> {
    // console.log(data);
    // return true;
    const user = await this.authService.valideUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
