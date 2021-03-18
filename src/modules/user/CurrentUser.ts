import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { ConnContext } from '../../types/ConnContext';

@Resolver()
export class CurrentUserResolver {
  @Query(() => User, { nullable: true })
  async currentUser(@Ctx() ctx: ConnContext): Promise<User | undefined> {
    if (!ctx.req.session!.userId) return undefined;

    return User.findOne(ctx.req.session!.userId);
  }
}
