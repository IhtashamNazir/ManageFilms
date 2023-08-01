import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class IdParamDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsMongoId()
  id: string;
}

export class BankIdParamDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  bankId: string;
}

export class DocIdParamDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  docId: string;
}
