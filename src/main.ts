import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigConst } from './constant/config.const';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  const options = new DocumentBuilder()
    .setTitle('Stage Alive Services')
    .setDescription('The Stage Alive Services API')
    .setVersion(ConfigConst.API_VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

 
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
