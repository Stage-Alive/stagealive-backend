import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistModule } from './artist/artist.module';
import { AuthModule } from './auth/auth.module';
import { ChatModule } from './chat/chat.module';
import { ContactFormModule } from './contactform/contactform.module';
import { GroupModule } from './group/group.module';
import { LiveModule } from './live/live.module';
import { MessageModule } from './message/message.module';
import { PrivateGroupModule } from './private-group/private-group.module';
import { PublicGroupModule } from './public-group/public-group.module';
import { RegionModule } from './region/region.module';
import { UserModule } from './user/user.module';
import { UserTypeModule } from './usertype/usertype.module';
import { AppGateway } from './websocket/app.gateway';
import { StorageModule } from './storage/storage.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(),
    UserModule,
    UserTypeModule,
    RegionModule,
    PublicGroupModule,
    PrivateGroupModule,
    GroupModule,
    ChatModule,
    MessageModule,
    LiveModule,
    AuthModule,
    ArtistModule,
    ContactFormModule,
    StorageModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
