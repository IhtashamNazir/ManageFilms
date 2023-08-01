/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { errorResponse } from '../constants/response';
import { IUserCognito } from 'src/interfaces/dto/user-cognito.interface';
import { IUserCreateResponse } from 'src/interfaces/dto/user-create-response.interface';
import { IUserLoginCognito } from 'src/interfaces/dto/user-login-cognito.interface';
import { UserService } from '../services/user.service';

@Controller()
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern('auth_signup')
  async signup(user: IUserCognito): Promise<IUserCreateResponse> {
    return this.userService.create(user);
  }

  @MessagePattern('auth_login')
  async loginUser(user: IUserLoginCognito): Promise<any> {
    if (user) {
      try {
        const userLogin = await this.userService.login(user);
        return userLogin;
      } catch (e) {
        return errorResponse(e);
      }
    }
  }

  @MessagePattern('auth_logout_user')
  async signout(
    accessToken: string,
    tokenType: 'access_token' | 'refresh_token',
  ): Promise<any> {
    return this.userService.logout(accessToken, tokenType);
  }
}
