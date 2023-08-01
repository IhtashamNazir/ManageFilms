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
    let isAuthorized = true;

    const secured = this.reflector.get<string[]>(
      'secured',
      context.getHandler(),
    );

    const authorizedRole = this.reflector.get<string[]>(
      'role',
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

    if (!userTokenInfo || !userTokenInfo.data) {
      throw new HttpException(
        {
          message: userTokenInfo.message,
          data: null,
          errors: null,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (authorizedRole && authorizedRole.length) {
      isAuthorized = false;

      const authorizedRoleData = authorizedRole.some(
        (ar) => ar === userTokenInfo?.data?.roles,
      );
      if (authorizedRoleData) {
        isAuthorized = true;
      }
      if (isAuthorized == false) {
        throw new HttpException(
          {
            message: 'User is not authorized to access this service',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
    }

    request.tokenData = userTokenInfo.data;

    return true;
  }
}
