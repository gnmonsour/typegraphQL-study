import { redis } from '../../redis';
import { v4 } from 'uuid';
import {
  CONFIRMATION_PREFIX,
  FORGOT_PASSWORD_PREFIX,
} from '../constants/redisPrefixes';

export const createConfirmationEndpoint = async (userId: number) => {
  const token = v4();
  const key = CONFIRMATION_PREFIX + token;
  await redis.set(key, userId, 'ex', 60 * 60 * 24); // 1 day expiration
  return `http://localhost:3000/user/confirm/${token}`;
};

export const createRenewPasswordEndpoint = async (userId: number) => {
  const token = v4();
  const key = FORGOT_PASSWORD_PREFIX + token;
  await redis.set(key, userId, 'ex', 60 * 60 * 2); // 2 hour expiration
  return `http://localhost:3000/user/change-password/${token}`;
};
