

# ---- Base Node ----
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat openssl1.1-compat && apk update

# ---- Turbo build ----
FROM base AS builder
WORKDIR /app
RUN npm i -G turbo
COPY . .
RUN npx turbo prune --scope=@informatyzacja/db --docker

# ---- Dependencies ----
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/package-lock.json ./package-lock.json
RUN npm ci --ignore-scripts

FROM base AS runner
LABEL name="prisma-studio"
WORKDIR /app
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/out/full .
COPY --from=builder --chown=nextjs:nodejs /app/out/package-lock.json ./package-lock.json
COPY --from=installer --chown=nextjs:nodejs /app/node_modules ./node_modules/


CMD npm run db:migrate:prod && npm run db:studio
