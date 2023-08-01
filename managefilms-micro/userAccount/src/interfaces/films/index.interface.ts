import { Document } from 'mongoose';

export interface IFilms extends Document {
  name: string;
  description: string;
  releaseDate: Date;
  country?: string;
  genre?: string;
  photo?: string;
}

export interface FilmBody {
  id: string;
  name: string;
  description: string;
  releaseDate: Date;
  country?: string;
  genre?: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FilmResult {
  hits: {
    total: number;
    hits: Array<{
      _source: FilmBody;
    }>;
  };
}
