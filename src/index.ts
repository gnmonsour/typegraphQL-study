import 'reflect-metadata';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { ArgumentValidationError, buildSchema } from 'type-graphql';

import { RegisterResolver } from './modules/user/Register';
import { createConnection } from 'typeorm';
const cc = console.log;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });
  const apolloServer = new ApolloServer({
    schema,
    formatError: (error: GraphQLError): GraphQLFormattedError => {
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
    },
  });
  const app = express();

  apolloServer.applyMiddleware({ app });
  const PORT = process.env.NODE_ENV || 4000;
  app.listen(PORT, () =>
    cc(`running on http://localhost:${PORT}/graphql \nctrl-C to terminate`)
  );
};

main().catch((err) => cc('main run error', err));
