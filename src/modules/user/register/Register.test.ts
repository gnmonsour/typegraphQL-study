import { gqall } from '../../../test-utils/gQall';
import { Connection } from 'typeorm';
import { testConn } from '../../../test-utils/testConn';

const cc = console.log;

let conn: Connection;

beforeAll(async () => {
  conn = await testConn();
});

afterAll(async () => {
  await conn.close();
});

const registerMutation = `
mutation Register($newUser: RegisterInput!) {
  register(
  newUser: $newUser
  ) {
    id
    firstName
    lastName
    email
    name
  }
}

`;

describe('Register', () => {
  it('creates a user', async () => {
    cc(
      await gqall({
        source: registerMutation,
        variableValues: {
          newUser: {
            firstName: 'first',
            lastName: 'one',
            email: 'meta-one@human.com',
            password: 'scramblina',
          },
        },
      })
    );
  });
});
