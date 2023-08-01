/* eslint-disable prettier/prettier */
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonServices } from './services/common';
import { SERVICES } from './constants';
import { AuthController } from './controllers/auth.controller';
import { WinstonConfigService } from './services/config/winston-config-service';
import { LoggerMiddleware } from './services/middleware/logger.middleware';
import { AuthGuard } from './services/guards/auth.guard';
import { ExceptionsFilter } from './services/filters/exceptions.filter';
import { PermissionGuard } from './services/guards/permission.guard';
import { DownloadService } from './services/common/download.service';
import { FilmController } from './controllers/film.controller';

console.log('Object.values(SERVICES)', Object.values(SERVICES));

@Module({
  imports: [
    ConfigModule.forRoot(),
    WinstonModule.forRootAsync({
      useClass: WinstonConfigService,
    }),
  ],
  controllers: [AuthController, FilmController],
  providers: [
    CommonServices,
    DownloadService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
    { provide: APP_FILTER, useClass: ExceptionsFilter },
    ...Object.values(SERVICES).map((SERVICE_NAME) => {
      return {
        provide: SERVICE_NAME,
        useFactory: (config: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [config.get('RABBITMQ_HOST')],
              queue: config.get(`${SERVICE_NAME}_QUEUE`),
              prefetchCount: 1,
              queueOptions: {
                durable: false,
              },
            },
          });
        },
        inject: [ConfigService],
      };
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
