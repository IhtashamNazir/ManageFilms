import { Document } from 'mongoose';

export interface IUserRole extends Document {
  id?: string;
  name: string;
  description: string;
  permissions?: string[];
}
