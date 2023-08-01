import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { errorResponse, successResponse } from '../constants/response';
import { IFilms } from '../interfaces/films/index.interface';
import { Films } from '../schemas/films.schema';
import FilmsSearchService from './elasticsearch.service';
@Injectable()
export class FilmService {
  constructor(
    @InjectModel(Films.name) private readonly filmModel: Model<Films>,
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
      console.log(newFilm, 'newFilm');

      await this.elasticSearchFilm.indexPost(newFilm);
      return successResponse(newFilm, 'Film added Successfully', 201);
    } catch (err) {
      return errorResponse(err);
    }
  }
}
