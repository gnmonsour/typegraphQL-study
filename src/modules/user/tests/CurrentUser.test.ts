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

const currentUserQuery = `
 {
  currentUser {
    id
    firstName
    lastName
    email
    name
  }
}

`;

describe('CurrentUser', () => {
  it('queries for a current user', async () => {
    const user = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const currentUser = await User.create({
      ...user,
    }).save();

    const response = await gqall({
      source: currentUserQuery,
      userId: currentUser.id,
    });

    expect(response).toMatchObject({
      data: {
        currentUser: {
          id: `${currentUser.id}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        },
      },
    });
  }); // it

  it('returns null', async () => {
    const response = await gqall({
      source: currentUserQuery,
    });

    expect(response).toMatchObject({
      data: {
        currentUser: null,
      },
    });
  }); // it
});
