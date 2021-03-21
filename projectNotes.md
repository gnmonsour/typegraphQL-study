# TypeGraphQL Study

Type safety is really important and a great help to produce clean, efficient projects.
However, it is verbose and that can drag on time and pleasure.

Using classes and decorators we get a little magic that we can use to keep coding with type, neat and speedy.

TypeGraphQL akes out the pain out of developing a GraphQL API with TypeScript in Node.js.

Along with TypeORM for abstracting the data layer we get a look at solid base to design projects with.

[Ben Awad's TypegraphQL YT playlist](https://www.youtube.com/watch?v=8yZImm2A1KE&list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs&index=2&ab_channel=BenAwad)

[TypeGraphQL website](https://typegraphql.com/)

[TypeORM website](https://typeorm.io/#/)

## Documentation Notes

Side notes and summaries to round out the tutorial

### Authorization

- typegraphql doesn't have middleware architecture for authorization (s/a express w passport)
- to ease the pain authorization is first-class feature starting with decorator `@Authorization`
  [see docs here](https://typegraphql.com/docs/authorization.html)
- it may be used as guard on entity class fields and guards in resolvers on query and mutation methods
- an auth checker function is defined then added to the schema
- typegraphql can also be used with jwt authentication tokens

---

### Confirmation Email

Using the [NodeMailer](https://nodemailer.com/about/) package.
It is open source, no dependencies.
You can set content to text and or HTML
The example code uses a service called [etheral](https://ethereal.email/) that is a fake smtp service. There is a good reference example on their landing page.

Intrigued to see that the personal service provider is in the envelope tab!! Service deletes the message 6 hours later!

---

### Mixins

Because of a comment wrt password base class refactoring concerning mixins the following articles help

[article on JS mixins](https://justinfagnani.com/2015/12/21/real-mixins-with-javascript-classes/)

[article on TS mixins](https://www.typescriptlang.org/docs/handbook/mixins.html)

General form of a mixin:

```ts
import { ClassType, Field, InputType } from 'type-graphql';
// constuctor function wraps a class
export const OkMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class OkInput extends BaseClass {
    @Field()
    ok: boolean; // trivial example
  }
  return OkInput;
};
```

---

### Jest and Testing

Jest has a constraint on exiting tests. If it sees there are async calls outstanding it raises a warning message.

You can add the `--detectOpenHandles` flag to the npm script to troubleshoot this.

Two comments had solutions.

- one suggested adding a timeout in the **'jest.setup.ts'** file

```ts
 // jest.setup.ts

 jset.setTimeout(30000);

 // jest.config.ts

 module.exports = {
   ...
   setupFilesAfterEnv: ["./jest.setup.js"]
 }
```

- another suggested adding the following redis gates in the before and after test runners,
- seems like these were the async calls dangling

```ts
let conn: Connection;

beforeAll(async () => {
  if (redis.status == 'end') await redis.connect();
  conn = await testConn();
});

afterAll(async () => {
  redis.disconnect();
  await conn.close();
});
```
