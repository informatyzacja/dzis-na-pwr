##### DEPENDENCIES

FROM --platform=linux/amd64 node:18-alpine AS builder
RUN apk add --no-cache libc6-compat openssl1.1-compat && apk update
WORKDIR /app
RUN npm i -G turbo
COPY . . 
RUN npx turbo prune --scope=@informatyzacja/web --docker

FROM --platform=linux/amd64 node:18-alpine AS installer
RUN apk add --no-cache libc6-compat openssl1.1-compat && apk update
WORKDIR /app

ENV NODE_ENV production
ENV CI         true
ENV SKIP_ENV_VALIDATION true

COPY .gitignore .gitignore 
COPY  --from=builder /app/tsconfig.json ./tsconfig.json
COPY --from=builder /app/out/json .
COPY --from=builder /app/out/package-lock.json\* ./

RUN npm ci --ignore-scripts

COPY --from=builder /app/out/full .

RUN npm run build -- --filter=@informatyzacja/web

FROM --platform=linux/amd64 node:18-alpine AS runner
LABEL name="events-app-web"
RUN apk add --no-cache libc6-compat openssl1.1-compat && apk update
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
EXPOSE 3000
ENV PORT 3000

ENV NODE_ENV production

# ENV NEXT_TELEMETRY_DISABLED 1 Optional

COPY --from=installer /app/apps/web/next.config.mjs ./
COPY --from=installer /app/apps/web/package.json ./
COPY --from=installer /app/packages/db ./packages/db

COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public


CMD node apps/web/server.js