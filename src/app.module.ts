import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './chat/app.gateway';
import { PublicGroupModule } from './public-group/public-group.module';
import { GroupModule } from './group/group.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    UserTypeModule,
    RegionModule,
    PublicGroupModule,
    GroupModule
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}

