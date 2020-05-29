import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { MailSendgrid } from 'src/helpers/mail-sendgrid';

@Module({
  controllers: [EmailController],
  providers: [MailSendgrid],
})
export class EmailModule {}
