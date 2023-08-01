import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation() {
    const url = `example.com/auth/confirm?token=`;

    await this.mailerService.sendMail({
      to: 'ihtasham104@gmail.com',
      subject: 'Welcome! Create your password',
      template: './collaborator-password', // `.hbs` extension is appended automatically
      context: {
        name: 'Ihtasham Nazir',
        url,
      },
    });
  }
}
