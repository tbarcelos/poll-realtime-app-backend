import { faker } from '@faker-js/faker';

export const userRequest = {
  username: faker.internet.userName(),
  password: faker.internet.password(),
};

export const userResponse = {
  userId: faker.number.int(),
  ...userRequest,
};
