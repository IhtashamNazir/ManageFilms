import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { sign } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { hash, compare, genSalt } from 'bcrypt';
import { errorResponse, successResponse } from '../constants/response';
import {
  SALTS,
  SECRET_KEY,
  TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY,
} from '../constants/index';
import { IUserCognito } from '../interfaces/dto/user-cognito.interface';
import { Users, UsersModel } from '../schemas/user.schema';
import { Tokens } from '../schemas/tokens.schema';
import { IUserLoginCognito } from 'src/interfaces/dto/user-login-cognito.interface';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private readonly userModel: UsersModel,
    @InjectModel(Tokens.name) private readonly tokenModel: Model<Tokens>,
  ) {}

  // Profile Edit service

  /**
   * Create an object composed of the picked object properties
   * @param {Object} object
   * @param {string[]} keys
   * @returns {Object}
   */
  pick(object: { [x: string]: any }, keys: any[]): object {
    return keys.reduce((obj: { [x: string]: any }, key: string | number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }

  async create(user: IUserCognito): Promise<any> {
    try {
      const emailCheck: number = await this.userModel.count({
        email: user.email,
      });
      console.log(emailCheck);
      if (emailCheck > 0)
        return errorResponse(`This email ${user.email} already exists`);
      const salt = await genSalt(SALTS);
      const hashedPassword = await hash(user.password, salt);
      const userObj: any = {
        ...user,
        passwordHash: hashedPassword,
        passwordRound: SALTS,
        passwordSalt: salt,
      };
      const newUser = new this.userModel(userObj);
      await newUser.save();
      return successResponse(newUser, 'User Created Successfully', 201);
    } catch (err) {
      return errorResponse(err);
    }
  }

  // public async login(user: IUserLoginCognito): Promise<any> {
  //   const secretKey = this.createSecretHash(user.email);

  //   const params: InitiateAuthRequest = {
  //     AuthFlow: 'USER_PASSWORD_AUTH',
  //     ClientId: this.clientId,
  //     AuthParameters: {
  //       USERNAME: user.email,
  //       PASSWORD: user.password,
  //       SECRET_HASH: secretKey,
  //     },
  //   };

  //   const tokenResult: any = await this.cognito.initiateAuth(params).promise();
  //   if (tokenResult?.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
  //     return {
  //       challengeName: tokenResult.ChallengeName,
  //       session: tokenResult.Session,
  //     };
  //   }
  //   const { AccessToken, RefreshToken, IdToken } =
  //     tokenResult.AuthenticationResult;

  //   const userVerify = await this.verifyToken(IdToken, 'id');

  //   return {
  //     accessToken: AccessToken,
  //     refreshToken: RefreshToken,
  //     tokenData: userVerify,
  //   };
  // }

  public async login(userData: IUserLoginCognito): Promise<any> {
    const findUser = await this.userModel.findOne({ email: userData.email });
    if (!findUser) return errorResponse(`Incorrect email or password`);

    const isPasswordMatching: boolean = await compare(
      userData.password,
      findUser.passwordHash,
    );
    if (!isPasswordMatching)
      return errorResponse(`Incorrect email or password`);

    const tokenData = this.createToken(findUser, 'local');
    const createdToken = await this.tokenModel.create({
      token: tokenData.token,
      tokenType: 'access_token',
      data: tokenData.token,
    });

    tokenData.token = createdToken.token;
    if (tokenData.refreshToken) {
      const createdRefreshToken = await this.tokenModel.create({
        token: tokenData.refreshToken,
        tokenType: 'refresh_token',
        data: tokenData.refreshToken,
        linkedToken: createdToken.id,
      });
      tokenData.refreshToken = createdRefreshToken.token;
    }
    return tokenData;
  }

  private createToken(user, loginType = 'local') {
    const dataStoredInToken = {
      id: user._id,
      name: user.firstName + ' ' + user.lastName,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      loginType: loginType,
    };
    const secretKey: string = SECRET_KEY;

    return {
      expiresIn: TOKEN_EXPIRY,
      token: sign(dataStoredInToken, secretKey, {
        expiresIn: TOKEN_EXPIRY,
      }),
      tokenType: 'Bearer',
      refreshToken: sign(dataStoredInToken, secretKey, {
        expiresIn: REFRESH_TOKEN_EXPIRY,
      }),
      refreshTokenExpiresIn: REFRESH_TOKEN_EXPIRY,
    };
  }

  public async logout(
    token: string,
    tokenType: 'access_token' | 'refresh_token',
  ): Promise<string> {
    await this.tokenModel.remove({ token: token, tokenType: tokenType });
    return 'Loggedout successfully';
  }
}
