import { teamFactory } from './team.factory';
import { userFactory } from './user.factory';
import { faker } from '@faker-js/faker/locale/pl';
import type { Prisma } from '@prisma/client';

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
    name: faker.lorem.words(3),
    description: faker.lorem.paragraphs(3),
    startsAt: faker.date.future(),
    logoUrl: faker.image.imageUrl(),
    slug: faker.lorem.slug(),
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
