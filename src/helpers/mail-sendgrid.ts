import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSendgrid {
  async sendEmail(email: string, msgSubject: string, msgBody: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'endhe.soares@vlive.com.br',
      subject: msgSubject,
      // text: msgTXTBody,
      html: msgBody,
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
