import { Arg, Mutation, Resolver } from 'type-graphql';
import { User } from '../../entity/User';
import { createRenewPasswordEndpoint } from '../utils/createAccessEndpoint';
import { sendEmail } from '../utils/sendEmail';

@Resolver(User)
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg('email') email: string): Promise<boolean> {
    // get the user associated to the email
    const user = await User.findOne({ where: { email } });
    if (!user) return true;

    const endpointUrl = await createRenewPasswordEndpoint(user.id);
    await sendEmail(email, endpointUrl);

    return true;
  }
}
