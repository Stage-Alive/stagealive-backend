import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserTypeModule } from './usertype/usertype.module';
import { RegionModule } from './region/region.module';
import { PublicGroupModule } from './public-group/public-group.module';
import { GroupModule } from './group/group.module';
import { AppGateway } from './chat/app.gateway';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    UserTypeModule,
    RegionModule,
    PublicGroupModule,
    GroupModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
