import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { redis } from '../../redis';
import { CONFIRMATION_PREFIX } from '../constants/redisPrefixes';

@Resolver(User)
export class ConfirmUserResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string): Promise<boolean> {
    const key = CONFIRMATION_PREFIX + token;
    const userId = await redis.get(key);
    if (!userId) return false;

    await User.update({ id: parseInt(userId, 10) }, { confirmed: true });
    await redis.del(key);

    return true;
  }
}
