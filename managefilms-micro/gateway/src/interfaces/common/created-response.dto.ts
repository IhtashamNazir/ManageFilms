import { ApiProperty } from '@nestjs/swagger';

export class CreatedResponseDto {
  @ApiProperty({ example: 'created_successfully' })
  message: string;
  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: null;
  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any };
}
