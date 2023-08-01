/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';

export const Auth = (secured: boolean) =>
  SetMetadata('secured', secured);
