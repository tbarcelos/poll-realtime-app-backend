import { faker } from '@faker-js/faker';

const option_title = faker.string.alpha();
const poll_title = faker.string.alpha();
const poll_id = faker.number.int();

export const pollResponse = {
  id: poll_id,
  title: poll_title,
  options: [
    {
      id: 1,
      title: option_title,
      votesCount: 0,
      poll: {
        id: poll_id,
        title: poll_title,
        options: [],
      },
    },
  ],
};

export const pollRequest = {
  title: poll_title,
  options: [option_title],
};
