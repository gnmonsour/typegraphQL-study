import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { ConnContext } from '../../types/ConnContext';

@Resolver(User)
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: ConnContext
  ): Promise<User | null> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return null;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return null;
    }

    // may want to consider throwing an error for direction
    if (!user.confirmed) {
      return null;
    }

    ctx.req.session!.userId = user.id;

    return user;
  }
}
