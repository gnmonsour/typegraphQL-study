import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { buildSchema } from 'type-graphql';

import { RegisterResolver } from './modules/user/Register';
import { createConnection } from 'typeorm';
const cc = console.log;

const main = async () => {
  await createConnection();

  const schema = await buildSchema({
    resolvers: [RegisterResolver],
  });
  const apolloServer = new ApolloServer({ schema });

  const app = express();

  apolloServer.applyMiddleware({ app });
  const PORT = process.env.NODE_ENV || 4000;
  app.listen(PORT, () =>
    cc(`running on http://localhost:${PORT}/graphql \nctrl-C to terminate`)
  );
};

main().catch((err) => cc('main run error', err));
