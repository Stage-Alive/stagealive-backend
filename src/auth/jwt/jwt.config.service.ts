import { JwtOptionsFactory, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigConst } from 'src/constant/config.const';

export class JwtConfigService implements JwtOptionsFactory {
  createJwtOptions(): JwtModuleOptions {
    return {
      signOptions: {},
      secret: ConfigConst.JWT_SECRET,
      verifyOptions: { ignoreExpiration: true },
    };
  }
}
