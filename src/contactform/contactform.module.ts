import { Module } from '@nestjs/common';
import { ContactFormController } from './contactform.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactFormEntity } from './contactform.entity';
import { ContactFormService } from './contactform.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactFormEntity])],
  controllers: [ContactFormController],
  providers: [ContactFormService],
  exports: [ContactFormService],
})
export class ContactFormModule {}
