import { Request } from 'express';

export interface ConnContext {
  req: Request & { session: { userId?: any } };
}
