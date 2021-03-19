import { ConnContext } from 'src/types/ConnContext';
import { Ctx, Mutation, Resolver } from 'type-graphql';

@Resolver()
export class LogoutResolver {
  @Mutation(() => Boolean)
  async logout(@Ctx() ctx: ConnContext): Promise<Boolean> {
    return new Promise((resolve, reject) =>
      ctx.req.session!.destroy((err) => {
        if (err) {
          console.log(err);
          return reject(false);
        }
        ctx.res.clearCookie('tgql');
        return resolve(true);
      })
    );
  }
}
