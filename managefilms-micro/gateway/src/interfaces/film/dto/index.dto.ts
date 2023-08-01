import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsISO8601, IsOptional } from 'class-validator';

export class CreateFilmDto {
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
