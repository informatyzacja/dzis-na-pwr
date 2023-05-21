import { createTRPCRouter, publicProcedure } from '../trpc';
import { z } from 'zod';

export const eventsRouter = createTRPCRouter({
  list: publicProcedure
    .input(
      z
        .object({
          limit: z.number().min(1).max(100).default(20),
          offset: z.number().min(0).default(0),
          search: z.string().optional(),
        })
        .default({})
    )
    .query(async ({ ctx, input: { limit, offset, search } }) => {
      const data = await ctx.prisma.event.findMany({
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
          numberOfAttendees: true,
          endsAt: true,
        },
        take: limit,
        skip: offset,
        where: search ? { name: { search } } : undefined,
      });

      const datesMappedtoStrings = data.map((event) => ({
        ...event,
        startsAt: event.startsAt.toISOString(),
        endsAt: event.endsAt?.toISOString(),
      }));

      return datesMappedtoStrings;
    }),
});
