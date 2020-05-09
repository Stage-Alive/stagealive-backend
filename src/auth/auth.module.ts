import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { FacebookStrategy } from './facebook.strategy';
import { JwtStrategy } from './jwt.strategy';
import { ConfigConst } from 'src/constant/config.const';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      signOptions: {},
      secret: ConfigConst.JWT_SECRET,
      verifyOptions: { ignoreExpiration: true },
    }),
  ],
  providers: [AuthService, JwtStrategy, FacebookStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
