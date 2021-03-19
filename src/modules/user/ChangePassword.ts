import { Arg, Mutation, Resolver } from 'type-graphql';
import { redis } from '../../redis';
import bcrypt from 'bcryptjs';

import { User } from '../../entity/User';
import { FORGOT_PASSWORD_PREFIX } from '../constants/redisPrefixes';
import { ChangePasswordInput } from './register/ChangePasswordInput';

@Resolver(User)
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(
    @Arg('data') { token, password }: ChangePasswordInput
  ): Promise<User | null> {
    // get the user associated with the token
    const key = FORGOT_PASSWORD_PREFIX + token;
    const userId = await redis.get(key);
    const changedPwd = await bcrypt.hash(password, 12);

    await redis.del(key);

    if (!userId) return null;

    const user = await User.findOne(userId);
    if (!user) return null;

    user.password = changedPwd;
    await user.save();

    return user;
  }
}
