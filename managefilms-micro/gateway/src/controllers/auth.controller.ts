/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Inject,
  Post,
  Res,
  Get,
  Req,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { SERVICES } from '../constants';
import { Response } from 'express';
import { CreateUserDto, LoginUserDto } from '../interfaces/auth/dto/index.dto';
import { IAuthorizedRequest } from '../interfaces/common/authorized-request.interface';
import { Auth } from '../decorators/auth.decorator';
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(SERVICES.USER_SERVICE) private userServiceClient: ClientProxy,
  ) {}

  @Post('/signup')
  public async createUser(
    @Body() user: CreateUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      const userResponse: any = await firstValueFrom(
        this.userServiceClient.send('auth_signup', user),
      );
      res.status(userResponse.statusCode).json(userResponse);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/login')
  public async loginUser(
    @Body() user: LoginUserDto,
    @Res() res: Response,
  ): Promise<any> {
    try {
      console.log('login');
      const userResponse: any = await firstValueFrom(
        this.userServiceClient.send('auth_login', user),
      );

      return res.status(userResponse.statusCode).json(userResponse);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/logout')
  @Auth(true)
  @ApiBearerAuth()
  async logout(
    @Req() request: IAuthorizedRequest,
    @Res() res: Response,
  ): Promise<any> {
    const logoutUserResponse = await firstValueFrom(
      this.userServiceClient.send('auth_logout', {
        accessToken: request.tokenData.accessToken,
      }),
    );
    return res.status(logoutUserResponse.statusCode).json(logoutUserResponse);
  }
}
