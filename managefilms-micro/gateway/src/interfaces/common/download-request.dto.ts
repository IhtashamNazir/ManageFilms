import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

export class DownloadRequestDto {
  @ApiProperty({
    type: String,
    required: false,
    enum: ['csv', 'xls'],
    default: 'csv',
  })
  @IsEnum(['csv', 'xls'])
  type: string;
}
