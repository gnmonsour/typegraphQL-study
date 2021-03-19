# TypeGraphQL Study

Takes out the pain of developing a GraphQL API with TypeScript in Node.js

Using classes and decorators is a little magic that you needed

[Ben Awad YT Playlist](https://www.youtube.com/watch?v=8yZImm2A1KE&list=PLN3n1USn4xlma1bBu3Tloe4NyYn9Ko8Gs&index=2&ab_channel=BenAwad)

[typegraphql website](https://typegraphql.com/)

## Documentation Notes

summaries to round out the tutorial

### Authorization

- typegraphql doesn't have middleware architecture for authorization (s/a express w passport)
- to ease the pain authorization is first-class feature starting with decorator `@Authorization`
  [see docs here](https://typegraphql.com/docs/authorization.html)
- it may be used as guard on entity class fields and guards in resolvers on query and mutation methods
- an auth checker function is defined then added to the schema
- typegraphql can also be used with jwt authentication tokens

-
