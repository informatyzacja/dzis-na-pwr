import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const eventsRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
        })
        .default({})
    )
    .query(({ ctx, input: { limit, offset } }) => {
      return ctx.prisma.event.findMany({
        orderBy: {
          startsAt: 'desc',
        },
        select: {
          id: true,
          name: true,
          description: true,
          startsAt: true,
          logoUrl: true,
          location: true,
          AgendaItem: {
            select: {
              id: true,
              name: true,
              startsAt: true,
              endsAt: true,
              description: true,
            },
          },
        },
        take: limit,
        skip: offset,
      });
    }),
});
