import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './chat/app.gateway';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule {}
