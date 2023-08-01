import { ApiProperty } from '@nestjs/swagger';

export class UpdatedResponseDto {
  @ApiProperty({ example: 'updated_successfully' })
  message: string;
  @ApiProperty({ example: null, nullable: true, type: 'null' })
  data: null;
  @ApiProperty({ example: null, nullable: true })
  error: { [key: string]: any };
}
