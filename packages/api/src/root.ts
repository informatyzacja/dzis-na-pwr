import { authRouter } from './router/auth';
import { eventsRouter } from './router/events';
import { createTRPCRouter } from './trpc';
import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';

export const appRouter = createTRPCRouter({
  auth: authRouter,
  events: eventsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

export type RouterOutputs = inferRouterOutputs<AppRouter>;
export type RouterInputs = inferRouterInputs<AppRouter>;
