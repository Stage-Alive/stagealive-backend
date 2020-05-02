import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthInterface } from './auth.interface';
import { UserEntity } from 'src/user/user.entity';
import { AuthService } from './auth.service';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secret_key',
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
