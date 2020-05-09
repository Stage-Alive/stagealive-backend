import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-facebook';
import { UserEntity } from 'src/user/user.entity';
import { AuthInterface } from './auth.interface';
import { AuthService } from './auth.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: '/return',
      profileFields: ['id', 'displayName', 'email'],
    });
  }

  async validate(data: AuthInterface) {
    let user = await this.authService.valideUser(data);

    if (!user) {
      user = await this.authService.createUserBasedOnFacebook(data);
    }
    return { access_token: this.jwtService.sign(data) };
  }

  //   async authenticate(){

  //   }
  //   async validate(data: AuthInterface): Promise<UserEntity> {
  //     const user = await this.authService.valideUser(data);
  //     if (!user) {
  //       throw new UnauthorizedException();
  //     }
  //     return user;
  //   }
  //   function(accessToken, refreshToken, profile, cb) {
  //     User.findOrCreate({ facebookId: profile.id }, function(err, user) {
  //       return cb(err, user);
  //     });
  //   }
}
