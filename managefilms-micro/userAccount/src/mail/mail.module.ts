import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { join } from 'path';
import { toInteger } from 'lodash';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SES_HOST,
        // port: toInteger(process.env.SES_PORT) ,
        secure: false,
        auth: {
          user: process.env.SES_USERNAME,
          pass: process.env.SES_PASSWORD,
        },
      },
      defaults: {
        from: process.env.SES_FROM_TO,
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
