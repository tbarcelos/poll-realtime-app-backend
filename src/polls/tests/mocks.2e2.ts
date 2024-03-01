import { faker } from '@faker-js/faker';

const option_title = faker.string.alpha();

const OptionResponse = {
  id: 1,
  title: option_title,
  votesCount: 0,
};

export const pollRequest = {
  title: faker.string.alpha(),
  options: [option_title],
};

export const pollResponse = {
  ...pollRequest,
  id: faker.number.int(),
  options: [OptionResponse],
};
