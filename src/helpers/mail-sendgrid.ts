import * as sgMail from '@sendgrid/mail';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSendgrid {
  async sendEmail(email: string, msgSubject: string, msgTXTBody: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: email,
      from: 'test@example.com',
      subject: msgSubject,
      text: 'and easy to do anywhere, even with Node.js',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    try {
      await sgMail.send(msg);
    } catch (error) {
      console.log(error);
    }
  }
}
