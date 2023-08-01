import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    type: Number,
    required: false,
    example: 1,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiProperty({
    type: Number,
    required: false,
    example: 10,
  })
  @Type(() => Number)
  @IsNumber()
  @Min(5)
  @IsOptional()
  limit?: number;
}
