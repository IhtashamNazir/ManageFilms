import { ApiProperty } from '@nestjs/swagger';

export class BadRequestResponseDto {
  @ApiProperty({ example: 400 })
  statusCode: string;

  @ApiProperty({ example: 'Required fields are missing!' })
  message: string;

  @ApiProperty({ example: 'Bad Request' })
  error: 'string';
}
