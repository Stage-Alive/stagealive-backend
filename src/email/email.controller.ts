import { Controller, Post, Body } from '@nestjs/common';
import { SendEmailDto } from './send-email.dto';
import { MailSendgrid } from 'src/helpers/mail-sendgrid';

@Controller('email')
export class EmailController {
  constructor(private readonly mailSendGrindHelper: MailSendgrid) {}
  @Post()
  async sendEmail(@Body() body: SendEmailDto) {
    await this.mailSendGrindHelper.sendEmail('endhe.elias@gmail.com', 'Ola', body.text);
    return 'ok';
  }
}
