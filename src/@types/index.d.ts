import { User as CustomUser } from '@prisma/client';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: CustomUser;
    }
  }
}
