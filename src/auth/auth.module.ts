import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigConst } from 'src/constant/config.const';
import { UserModule } from 'src/user/user.module';
import { UserTypeEntity } from 'src/usertype/usertype.entity';
import { UserTypeService } from 'src/usertype/usertype.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.register({
      signOptions: {},
      secret: ConfigConst.JWT_SECRET,
      verifyOptions: { ignoreExpiration: true },
    }),
    TypeOrmModule.forFeature([UserTypeEntity]),
  ],
  providers: [AuthService, JwtStrategy, UserTypeService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
