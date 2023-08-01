import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import { Transport } from '@nestjs/microservices';
import { SERVICE } from './constants';
async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   UserModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [process.env.RABBITMQ_HOST],
  //       queue: process.env[`${SERVICE}_QUEUE`],
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );
  // await app.listen();
  const app = await NestFactory.create(UserModule);
  await app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_HOST],
      queue: process.env[`${SERVICE}_QUEUE`],
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
}
bootstrap();
