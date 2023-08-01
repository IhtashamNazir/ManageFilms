import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorResponse, successResponse } from '../constants/response';
import { IFilms, RateFilmDto } from '../interfaces/films/index.interface';
import { Films } from '../schemas/films.schema';
import { Ratings } from '../schemas/rating.schema';
import FilmsSearchService from './elasticsearch.service';
@Injectable()
export class FilmService {
  constructor(
    @InjectModel(Films.name) private readonly filmModel: Model<Films>,
    @InjectModel(Ratings.name) private readonly ratingModel: Model<Ratings>,
    private elasticSearchFilm: FilmsSearchService,
  ) {}

  // Profile Edit service

  /**
   * Create an object composed of the picked object properties
   * @param {Object} object
   * @param {string[]} keys
   * @returns {Object}
   */
  pick(object: { [x: string]: any }, keys: any[]): object {
    return keys.reduce((obj: { [x: string]: any }, key: string | number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }

  async create(film: IFilms): Promise<any> {
    try {
      const newFilm = new this.filmModel(film);
      await newFilm.save();
      await this.elasticSearchFilm.indexPost(newFilm);
      return successResponse(newFilm, 'Film added Successfully', 201);
    } catch (err) {
      return errorResponse(err);
    }
  }

  async search(query: string): Promise<any> {
    try {
      const results = await this.elasticSearchFilm.search(query);
      return successResponse(results, 'Film list', 201);
    } catch (err) {
      return errorResponse(err);
    }
  }

  async rate(rate: RateFilmDto): Promise<any> {
    try {
      const film = await this.filmModel.findOne({ _id: rate.filmId });
      if (!film) return errorResponse('Film not found');
      const rating = await this.ratingModel.create(rate);
      await this.elasticSearchFilm.indexRatePost(rating);
      return successResponse(rating, 'Film rated', 201);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
