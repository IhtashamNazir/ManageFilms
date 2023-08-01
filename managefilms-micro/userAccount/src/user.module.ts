import { Module } from '@nestjs/common';

import { MongoConfigService } from './services/config/mongo-config.service';
import { UserService } from './services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HttpModule } from '@nestjs/axios';
import { UsersSchema, Users } from './schemas/user.schema';
import { TokensSchema, Tokens } from './schemas/tokens.schema';
import { FilmsSchema, Films } from './schemas/films.schema';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailModule } from './mail/mail.module';

import { AgendaModule } from '@sigmaott/nestjs-agenda';

import { AuthController } from './controllers/auth.controller';
import { MailService } from './mail/mail.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { FilmService } from './services/film.service';
import FilmsSearchService from './services/elasticsearch.service';
import { FilmController } from './controllers/film.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRootAsync({
      useClass: MongoConfigService,
    }),
    AgendaModule.forRootAsync(AgendaModule, {
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        db: { address: config.get('MONGO_DSN') },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([
      {
        name: Users.name,
        schema: UsersSchema,
        collection: 'users',
      },
      {
        name: Tokens.name,
        schema: TokensSchema,
        collection: 'tokens',
      },
      {
        name: Films.name,
        schema: FilmsSchema,
        collection: 'films',
      },
    ]),
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        node: configService.get('ELASTICSEARCH_NODE'),
        auth: {
          username: configService.get('ELASTICSEARCH_USERNAME'),
          password: configService.get('ELASTICSEARCH_PASSWORD'),
        },
      }),
      inject: [ConfigService],
    }),
    HttpModule,
    MailModule,
  ],
  controllers: [AuthController, FilmController],
  providers: [UserService, MailService, FilmService, FilmsSearchService],
})
export class UserModule {}
