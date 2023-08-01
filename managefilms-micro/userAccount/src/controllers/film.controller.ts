import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { IFilms } from 'src/interfaces/films/index.interface';
import { FilmService } from '../services/film.service';

@Controller()
export class FilmController {
  constructor(private readonly filmService: FilmService) {}

  @MessagePattern('create_film')
  async createFilm(film: IFilms): Promise<any> {
    return this.filmService.create(film);
  }

  @MessagePattern('search_film')
  async searchFilm(query: string): Promise<any> {
    return this.filmService.search(query);
  }
}
