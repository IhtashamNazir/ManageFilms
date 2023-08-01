import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsISO8601,
  IsOptional,
  IsMongoId,
  IsNumber,
} from 'class-validator';

export class CreateFilmDto {
  userId: string;
  @ApiProperty({
    required: true,
    example: 'John Wick',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: 'Dummy description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    required: true,
    example: '2023-01-03',
  })
  @IsISO8601()
  @IsNotEmpty()
  releaseDate: Date;

  @ApiProperty({
    required: false,
    example: 'USA',
  })
  @IsString()
  @IsOptional()
  country?: string;

  @ApiProperty({
    required: false,
    example: 'Action',
  })
  @IsString()
  @IsOptional()
  genre?: string;
}

export class QueryFilmDto {
  @ApiProperty({
    required: false,
    example: 'john',
  })
  @IsString()
  @IsOptional()
  search?: string;
}

export class RateFilmDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '63f6dd9e22164821f67cac0a',
  })
  @IsOptional()
  @IsMongoId()
  filmId?: string;

  @ApiProperty({ type: Number, required: true, example: 2 })
  @IsNumber()
  @IsNotEmpty()
  rate: number;

  @ApiProperty({
    required: false,
    example: 'john',
  })
  @IsString()
  @IsOptional()
  comment?: string;

  userId: string;
}
