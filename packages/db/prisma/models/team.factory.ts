import { faker } from '@faker-js/faker/locale/pl';
import type { Prisma } from '@prisma/client';

export const teamFactory = (
  props?: Partial<Prisma.TeamCreateInput>
): Prisma.TeamCreateInput => {
  return {
    name: faker.lorem.words(3),
    slug: faker.lorem.slug(),
    ...props,
  };
};
