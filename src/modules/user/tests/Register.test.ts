import { gqall } from '../../../test-utils/gQall';
import { Connection } from 'typeorm';
import { testConn } from '../../../test-utils/testConn';
import { redis } from '../../../redis';
import faker from 'faker';
import { User } from '../../../entity/User';

// const cc = console.log;

let conn: Connection;

beforeAll(async () => {
  if (redis.status == 'end') await redis.connect();
  conn = await testConn();
});

afterAll(async () => {
  redis.disconnect();
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
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await gqall({
      source: registerMutation,
      variableValues: {
        newUser: user,
      },
    });

    // cc('gqall', response);
    expect(response).toMatchObject({
      data: {
        register: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });

    const dbRecord = await User.findOne({ where: { email: user.email } });
    expect(dbRecord).toBeDefined();
    expect(dbRecord!.confirmed).toBeFalsy();
    expect(dbRecord!.firstName).toBe(user.firstName);
  }); // it
});
