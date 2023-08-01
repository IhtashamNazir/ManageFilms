import { IUser } from '../user.interface';

export interface IUserCreateResponse {
  status: number;
  message: string;
  data: IUser;
  error: { [key: string]: any } | null;
}
