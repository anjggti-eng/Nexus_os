FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/ai-service/package.json ./apps/ai-service/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @nexusos/ai-service build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY --from=builder /app/apps/ai-service/dist ./dist
COPY --from=builder /app/apps/ai-service/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile
EXPOSE 3009
CMD ["node", "dist/main"]
