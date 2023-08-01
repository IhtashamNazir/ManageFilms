import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  IFilms,
  // FilmBody,
  // FilmResult,
} from '../interfaces/films/index.interface';

@Injectable()
export default class FilmsSearchService {
  index = 'films';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(film: IFilms) {
    return this.elasticsearchService.index({
      index: this.index,
      body: { ...film },
    });
  }

  async search(text: string) {
    const result = await this.elasticsearchService.search({
      index: this.index,
      body: {
        query: {
          multi_match: {
            query: text,
            fields: ['name', 'description'],
          },
        },
      },
    });
    const body = result['hits'];
    const hits = body.hits;
    return hits.map((item) => item._source);
  }
}
