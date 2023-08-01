import { IUser } from '../user.interface';

export interface IUserLoginResponse {
  message: string;
  status: number;
  data: IUserLogin;
  error: { [key: string]: any } | null;
}

export interface IUserLogin {
  accessToken?: string;
  refreshToken?: string;
  roles?: string;
  email?: string;
  user?: IUser;
  session?: string;
  veriff?: IVeriffData;
}

export interface IVeriffData {
  userId: string;
  firstName: string;
  lastName: string;
  sessionId?: string;
  sessionUrl?: string;
}
