import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import {
  IFilms,
  RateFilmDto,
  // FilmBody,
  // FilmResult,
} from '../interfaces/films/index.interface';

@Injectable()
export default class FilmsSearchService {
  index = 'films';
  rateIndex = 'rate';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async indexPost(film: IFilms) {
    return this.elasticsearchService.index({
      index: this.index,
      body: { ...film },
    });
  }

  async indexRatePost(rating: RateFilmDto) {
    return this.elasticsearchService.index({
      index: this.rateIndex,
      body: { ...rating },
    });
  }

  async search(text: any) {
    const searchQuery = {
      index: 'films',
      body: {
        query: {
          match: {
            name: text.search,
          },
        },
      },
    };
    const result = await this.elasticsearchService.search(searchQuery);
    console.log(result.hits);

    const body = result['hits'];
    const hits = body.hits;
    return hits.map((item: any) => item._source._doc);
  }
}
