import * as AWS from 'aws-sdk';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailSesHelper {
  async sendEmailTXTFormat(email: string, msgSubject: string, msgTXTBody: string) {
    AWS.config.update({
      accessKeyId: process.env.ACCESS_KEY_ID,
      secretAccessKey: process.env.SECRET_ACCESS_KEY,
    });

    const ses = new AWS.SES({ apiVersion: '2010-12-01' });

    const params = {
      Destination: {
        ToAddresses: [email], // Email address/addresses that you want to send your email
      },
      //ConfigurationSetName: '',
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: msgTXTBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: msgSubject,
        },
      },
      Source: 'endhe.soares@vlive.com.br',
    };

    const sendEmail = ses.sendEmail(params).promise();

    sendEmail
      .then(data => {
        console.log('email submitted to SES', data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}
