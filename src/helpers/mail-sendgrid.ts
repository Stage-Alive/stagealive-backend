import * as sgMail from '@sendgrid/mail';

export class MailSendgrid {
  sendEmail(email: string, msgSubject: string, msgTXTBody: string) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }
}
