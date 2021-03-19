# TypeGraphQL Study

## 2021/03/19

### Authorization

- working through a demo implementation with the @Authorized decorator
- adding it to the RegisterResolver simple query 'greet'
- add an auth check to the schema builder, stripped down
- the error returned is not informative so an additional guard can be added with middleware
- added an isAuth middleware function and placed it in the `@UseMiddleware` decorator
- the isAuth middleware throws a custom error message!!
- learned that `!!` is a cast to `Boolean` very cool
- as well that `!.` is an assertion that the object will be defined

### Confirmation Email

- install nodemailer and uuid package
- created 'sendEmail.ts' file at 'modules/utils'
- created sendEmail function at same
- ran test and previewed at [ethereal](https://ethereal.email/)
- the mock link is provided in the terminal
- updated the sendEmail function with email and a confirmation endpoint url
- created a file and function to create the confirmation endpoint 'createConfirmationEndpoint.ts'
- added the sendEmail function to the RegisterResolver `register` mutation
- ran test in graphql playground with the register mutation, success!!
- there is no backend server endpoint yet but can build out a confirm user resolver-mutation to begin with
- tested the manual mutation to confirm then logged in to verify

### Forgot Password Email

- added 'ForgotPasswordResolver' with mutation `forgotPassword`
- similar to ConfirmUserResolver
- refactored the createConfirmationEndpoint to separate the confirmation from the forgotten use cases
- changed the file name to 'createAccessEndpoints' adjusted imports
- create redis prefix constants to separate confirmation and forgotten use cases
- using prefixed token as the redis key but token alone in the emailed endpoint
- adjusted RegisterResolver and ConfirmUserResolver for the redis prefixes
- added 'ChangePassword' resolver and a ChangePasswordInput dto type
- on ConfirmUser and ChangePassword add the prefix back to recreate the redis key
- deleted the redis record after retreiving it

- ***

## 2021/03/18

### Validation

- ~~installed 'ts-node-dev' package to replace nodemon, resulted in faster restart on change~~ reverted, too slow
- moved FieldResolver into User class from RegisterResolver
- added validation
- tried adding error formatting to the apollo server but ran into an issue with the type clashes in new version of apolloserver [see this thread](https://github.com/MichalLytek/type-graphql/issues/258)
- formatting the validation errors was really stupid so spent a lot of time coming up with something usable
- return an array of strings for each validation error, this may end up being extensible
- adding a custom validation decorator to handle unique emails

### Login

- installed session, cors, redis packages
- setup session and cors middleware
- added a redis instance used in the session store
- added a Login Resolver
- added a session context interface for request
- need to define a userId type in the context
- will need to followup with a response type in the future
- make sure that the graphqli setting is set to 'include' for request.credentials
  - otherwise you won't see the cookie saved via the ui request
- tested and verified cookie was saved on a successful login
- tested for bad email and bad password returned null for the login
- added a resolver to retrieve the current user that will be used for authentication later

---

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
