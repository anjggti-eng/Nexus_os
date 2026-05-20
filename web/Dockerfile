FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY web/package.json ./web/
COPY packages/ ./packages/
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm --filter @nexusos/web build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/web/.next/standalone ./
COPY --from=builder /app/web/.next/static ./.next/static
COPY --from=builder /app/web/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
