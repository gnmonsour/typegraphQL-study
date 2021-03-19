import { Request, Response } from 'express';

export interface ConnContext {
  req: Request & { session: { userId?: any } };
  res: Response;
}
