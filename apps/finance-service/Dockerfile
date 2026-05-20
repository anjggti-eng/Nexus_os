FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/finance-service/package.json ./apps/finance-service/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @nexusos/finance-service run db:generate
RUN pnpm --filter @nexusos/finance-service build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY --from=builder /app/apps/finance-service/dist ./dist
COPY --from=builder /app/apps/finance-service/package.json ./
COPY --from=builder /app/apps/finance-service/prisma ./prisma
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
RUN npx prisma generate
EXPOSE 3007
CMD ["node", "dist/main"]
