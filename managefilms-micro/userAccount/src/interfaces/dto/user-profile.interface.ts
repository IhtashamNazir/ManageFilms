import mongoose from 'mongoose';
import { ITokenData } from '../common/user-req.interface';
import { IUser } from '../user.interface';

interface IDbs {
  enhancedDBS: boolean;
  certificateNumber?: string;
  issueDate?: Date;
  dbsOnline?: boolean;
  serviceNumber?: string;
  certificates?: mongoose.Types.ObjectId;
}
interface IRightToWork {
  rightToWork: string;
  visaType?: string;
  brpNumber?: string;
  expiryDate?: Date;
  shareCode?: string;
  certificates?: mongoose.Types.ObjectId;
}

export interface IBackgroundChecks {
  userId: string;
  createdBy: string;
  dbsCheck?: IDbs;
  rightToWork?: IRightToWork;
}

export class IProfileInfoDto {
  clientName?: string;
  emailNotification?: boolean;
  phone?: string;
  addtionalPhone?: string;
  businessName?: string;
  clientType?: string;
  group?: string;
  isAudited?: boolean;
}

export class IAddressDto {
  country?: string;
  city?: string;
  line1?: string;
  postCode?: string;
  typedAddress?: string;
  isAudited?: boolean;
}

export class IClientProfileDto {
  userId: string;
  createdBy: string;
  profileInfo?: IProfileInfoDto;
  address?: IAddressDto;
  publicInfo?: string;
  isAudited?: boolean;
}
export class IDepartmentDto {
  userId: string;
  departmentId?: string;
  createdBy: string;
  name: string;
  description: string;
}

export class IGetDepartmentDto {
  userId: string;
  departmentId?: string;
}
export class IAdminUsersDto {
  userId: string;
  createdBy: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  department: string;
}

export class IUpdateAdminUsersDto {
  params?: {
    adminId: string;
  };
  body?: {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    type?: string;
    department?: string;
  };
  user: ITokenData;
}

export class IUpdateEmailAndPhoneDto {
  newEmail?: string;
  createdBy: string;
  oldEmail?: string;
  newPhone?: string;
  user: ITokenData;
  userId?: string;
}

export class IEmailwithCodeDto {
  newEmail: string;
  createdBy: string;
  code: string;
  user: ITokenData;
}

export class IProfileCommentsDto {
  userId: string;
  createdBy: string;
  comments: string;
}
export class IGetAdminUsersDto {
  userId: string;
  departmentId?: string;
  adminId?: string;
  search?: string;
  page?: number;
  limit?: number;
}

export class IDeleteAdminUserDto {
  params: {
    adminId: string;
  };
  createdBy: string;
  user: ITokenData;
}
