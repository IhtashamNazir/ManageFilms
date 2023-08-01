import { IUser } from '../user/user.interface';

export interface IAuthorizedRequest extends Request {
  tokenData?: ITokenData;
}

export interface ITokenData {
  user?: IUser;
  accessToken: string;
  roles: string;
}
