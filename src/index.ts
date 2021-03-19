import 'reflect-metadata';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { ArgumentValidationError, buildSchema } from 'type-graphql';

import { RegisterResolver } from './modules/user/Register';
import { createConnection } from 'typeorm';
import session from 'express-session';
import connectRedis from 'connect-redis';
import cors from 'cors';
import { redis } from './redis';
import { LoginResolver } from './modules/user/Login';
import { CurrentUserResolver } from './modules/user/CurrentUser';
import { ConfirmUserResolver } from './modules/user/ConfirmUser';
import { ForgotPasswordResolver } from './modules/user/ForgotPassword';
import { ChangePasswordResolver } from './modules/user/ChangePassword';
import { LogoutResolver } from './modules/user/Logout';

const cc = console.log;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [
      RegisterResolver,
      LoginResolver,
      CurrentUserResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      ChangePasswordResolver,
      LogoutResolver,
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    },
  });
  const apolloServer = new ApolloServer({
    schema,
    formatError: validationFormatter,
    context: ({ req, res }: any) => ({ req, res }),
  });
  const app = express();

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000',
    })
  );

  app.use(
    session({
      store: new RedisStore({ client: redis as any }),
      name: 'tgql',
      secret: 'secretSnail',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365,
      },
    })
  );

  apolloServer.applyMiddleware({ app });
  const PORT = process.env.NODE_ENV || 4000;
  app.listen(PORT, () =>
    cc(`running on http://localhost:${PORT}/graphql \nctrl-C to terminate`)
  );
};

main().catch((err) => cc('main run error', err));

const validationFormatter = (error: GraphQLError): GraphQLFormattedError => {
  if (error.originalError instanceof ArgumentValidationError) {
    const { extensions } = error;
    if (extensions?.exception) {
      const { validationErrors } = extensions.exception;
      if (validationErrors) {
        let msg: string[] = [];
        Object.values(validationErrors).forEach((element: any) => {
          Object.values(element.constraints).forEach((constraint: any) => {
            msg.push(`${constraint}`);
          });
        });

        extensions.msg = msg;
      }
    }
    return error.extensions?.msg;
  }
  return error;
};
