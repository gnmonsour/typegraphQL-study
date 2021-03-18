# TypeGraphQL Study

## 2021/03/18

- installed 'ts-node-dev' package to replace nodemon, resulted in faster restart on change
- moved FieldResolver into User class from RegisterResolver

  ***

## 2021/03/17

### Setup

- a node project

```json
  "dependencies": {
    "apollo-server-express": "^2.21.1",
    "express": "^4.17.1",
    "graphql": "^15.5.0",
    "reflect-metadata": "^0.1.13",
    "type-graphql": "^1.1.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.7",
    "@types/graphql": "^14.5.0",
    "@types/node": "^14.14.35",
    "ts-node": "^9.1.1",
    "typescript"

```

- setup `tsconfig` cross-referencing typegraphql (their github) and Awad's project source

  - set `allowSyntheticDefaultImports` to true to import express rather than require in

- `reflect-metadata` needs to be first import to facilitate decorators and types implemented by `typegraphql`

- ran successfully and commited

### Register Resolver

Using TypeOrm and Postgresql along with bcryptjs

- setup ormconfig.json to define the connection properties
- created a User entity class based on typeorm specs
- needed set 'strictPropertyInitialization' to false in the tsconfig.json file to disable the compile error on the User entity class properties
- added postgres path to environment variables
- added a mutation, enhance User with typeorm decorators to align to graphql types
- setup a FieldResolver annotation in the resolver to return a concatenation as a name field
- query failure!! found that I mispelled synchronize in the ormconfig.json
- added user data to test, succeeds and denies duplicate email as well
