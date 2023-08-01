export interface IUser {
  id?: string;
  _id?: string;
  cognitoId: string;
  newsletterStatus: boolean;
  firstName: string;
  lastName: string;
  roleInfo: string | object;
  profileKey: string;
}
export interface ITokenData {
  user?: IUser;
  accessToken: string;
  roles: string;
}
