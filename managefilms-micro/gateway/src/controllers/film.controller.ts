/* eslint-disable prettier/prettier */
import {
  Body,
  Get,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  Query,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { SERVICES } from '../constants';
import { Response } from 'express';
import {
  CreateFilmDto,
  QueryFilmDto,
  RateFilmDto,
} from '../interfaces/film/dto/index.dto';
import { Auth } from '../decorators/auth.decorator';
@ApiTags('Films')
@Controller('film')
export class FilmController {
  constructor(
    @Inject(SERVICES.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  @Post()
  @Auth(true)
  @ApiBearerAuth()
  public async createFilm(
    @Body() film: CreateFilmDto,
    @Res() res: Response,
    @Req() req: any,
  ): Promise<any> {
    try {
      film.userId = req?.tokenData?._id;
      const filmResponse: any = await firstValueFrom(
        this.userServiceClient.send('create_film', film),
      );
      res.status(filmResponse.statusCode).json(filmResponse);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/search')
  @Auth(true)
  @ApiBearerAuth()
  public async searchFilm(
    @Query() query: QueryFilmDto,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const filmResponse: any = await firstValueFrom(
        this.userServiceClient.send('search_film', query),
      );
      res.status(filmResponse.statusCode).json(filmResponse);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/rate')
  @Auth(true)
  @ApiBearerAuth()
  public async rateFilm(
    @Query() query: RateFilmDto,
    @Req() req: any,
    @Res() res: Response,
  ): Promise<any> {
    try {
      query.userId = req?.tokenData?._id;
      const filmResponse: any = await firstValueFrom(
        this.userServiceClient.send('rate_film', query),
      );
      res.status(filmResponse.statusCode).json(filmResponse);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
