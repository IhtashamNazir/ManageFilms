import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    uniqueItems: true,
    example: 'test@testocc.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: 'John',
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    required: true,
    example: 'Doe',
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    minLength: 8,
    example: 'Test111@',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\-_@$!%*?&])[A-Za-z\d\-_@$!%*?&]{8,}$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;
}

export class LoginUserDto {
  @ApiProperty({
    uniqueItems: true,
    required: true,
    example: 'cbadmin1@yopmail.com',
  })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    minLength: 8,
    required: true,
    example: 'Test111@',
  })
  @IsNotEmpty()
  password: string;
}
