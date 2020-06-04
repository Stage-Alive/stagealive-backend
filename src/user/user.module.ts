import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigConst } from 'src/constant/config.const';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { UserTypeService } from 'src/usertype/usertype.service';
import { UserTypeEntity } from 'src/usertype/usertype.entity';
import { MailSendgrid } from 'src/helpers/mail-sendgrid';

@Module({
  imports: [
    JwtModule.register({
      signOptions: {},
      secret: ConfigConst.JWT_SECRET,
      verifyOptions: { ignoreExpiration: true },
    }),
    TypeOrmModule.forFeature([UserEntity, UserTypeEntity]),
  ],
  controllers: [UserController],
  providers: [UserService, UserTypeService, MailSendgrid],
  exports: [UserService],
})
export class UserModule {}
