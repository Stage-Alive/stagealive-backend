import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigConst } from 'src/constant/config.const';
import { UserEntity } from 'src/user/user.entity';
import { AuthInterface } from '../auth.interface';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: ConfigConst.JWT_SECRET,
    });
  }

  async validate(data: AuthInterface): Promise<UserEntity> {
    const user = await this.authService.valideUser(data);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
