/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { SERVICES } from '../constants';
import { Response } from 'express';
import { CreateFilmDto } from '../interfaces/film/dto/index.dto';
import { Auth } from '../decorators/auth.decorator';
@ApiTags('Films')
@Controller('film')
export class FilmController {
  constructor(
    @Inject(SERVICES.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  @Post()
  // @Auth(true)
  // @ApiBearerAuth()
  public async createFilm(
    @Body() film: CreateFilmDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const filmResponse: any = await firstValueFrom(
        this.userServiceClient.send('create_film', film),
      );
      res.status(filmResponse.statusCode).json(filmResponse);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
