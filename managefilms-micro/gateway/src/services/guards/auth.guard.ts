import {
  Injectable,
  Inject,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

import { CommonServices } from '../common';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    private readonly commonServices: CommonServices,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );
    if (!secured) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) {
      throw new HttpException(
        {
          message: 'Authorization Token missing',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    // check token from other microservice
    const userTokenInfo = await firstValueFrom(
      this.userServiceClient.send('auth_verify_token', {
        token: authorization?.split(' ')?.[1],
      }),
    );
    console.log(userTokenInfo);

    if (!userTokenInfo) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    request.tokenData = userTokenInfo;
    return true;
  }
}
