import { Arg, Mutation, Query, Resolver, UseMiddleware } from 'type-graphql';
import bcrypt from 'bcryptjs';
import { User } from '../../entity/User';
import { RegisterInput } from './register/RegisterInput';
import { isAuth } from '../middleware/isAuth';

@Resolver(User)
export class RegisterResolver {
  @UseMiddleware(isAuth)
  @Query(() => String)
  async greet() {
    return 'Hello George';
  }

  @Mutation(() => User)
  async register(
    @Arg('newUser') { firstName, lastName, email, password }: RegisterInput
  ): Promise<User> {
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    }).save();

    return user;
  }
}
