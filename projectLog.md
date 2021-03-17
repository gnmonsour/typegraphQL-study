# TypeGraphQL Study

## 2021/03/17

- setup node project

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
- needed to allowSyntheticDefaultImports to use express with an import call
- imported reflect-metadata to resolve application crashing

-
