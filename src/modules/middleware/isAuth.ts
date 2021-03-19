import { ConnContext } from 'src/types/ConnContext';
import { MiddlewareFn } from 'type-graphql';

export const isAuth: MiddlewareFn<ConnContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error('Not Authenticated');
  }
  return next();
};
