FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/workflow-service/package.json ./apps/workflow-service/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @nexusos/workflow-service run db:generate
RUN pnpm --filter @nexusos/workflow-service build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY --from=builder /app/apps/workflow-service/dist ./dist
COPY --from=builder /app/apps/workflow-service/package.json ./
COPY --from=builder /app/apps/workflow-service/prisma ./prisma
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
RUN npx prisma generate
EXPOSE 3005
CMD ["node", "dist/main"]
