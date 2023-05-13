import { prisma } from '../index';
import { eventFactory } from './models/event.factory';

async function main() {
  await prisma.event.deleteMany();

  const seedSize = 100;

  for (let i = 0; i < seedSize; i++) {
    await prisma.event.create({
      data: eventFactory(),
    });
  }

  console.log(`Seeded ${seedSize} events`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
