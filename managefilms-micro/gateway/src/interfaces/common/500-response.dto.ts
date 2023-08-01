import { ApiProperty } from '@nestjs/swagger';

export class ServerErrorResponseDto {
  @ApiProperty({ example: 500 })
  statusCode: string;

  @ApiProperty({ example: 'Failed to complete the request' })
  message: string;

  @ApiProperty({ example: 'Internal Server Error' })
  error: string;
}
