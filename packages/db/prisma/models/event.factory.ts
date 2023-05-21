import { teamFactory } from './team.factory';
import { userFactory } from './user.factory';
import { faker } from '@faker-js/faker/locale/pl';
import type { Prisma } from '@prisma/client';

const eventsNames = [
  'Wieczór Gier Planszowych',
  'OdraNa Juwenalia',
  'Wieczór RPG - maj 2023',
  'Studenckie Wesele PWr Party',
  'Studenci na tropie wydziałowych tajemnic - Gra samorządowca 2023',
  'Studencka Dawka Kultury x DKF - „Sekrety i kłamstwa',
];

export const eventFactory = (
  props?: Partial<Prisma.EventCreateInput>
): Prisma.EventCreateInput => {
  const user = userFactory();

  const team = teamFactory({
    UsersTeams: {
      create: {
        role: 'ADMIN',
        user: {
          connectOrCreate: {
            create: user,
            where: {
              email: user.email ?? '',
            },
          },
        },
      },
    },
  });

  return {
    name: faker.helpers.arrayElement(eventsNames),
    description: faker.lorem.paragraphs(3),
    startsAt: faker.date.future(),
    logoUrl: faker.image.imageUrl(undefined, undefined, undefined, true),
    slug: faker.lorem.slug(),
    numberOfAttendees: faker.datatype.number(1000),
    user: {
      connectOrCreate: {
        create: user,
        where: {
          email: user.email ?? '',
        },
      },
    },
    team: {
      connectOrCreate: {
        create: team,
        where: {
          slug: team.slug ?? '',
        },
      },
    },
    ...props,
  };
};
