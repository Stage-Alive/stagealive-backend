import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigConst } from 'src/constant/config.const';

@Module({
  imports: [JwtModule.register({ secret: ConfigConst.JWT_SECRET })],
})
export class JWTModule {}
