ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_WS_URL

FROM node:20-alpine AS builder
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.json ./
COPY apps/ apps/
COPY packages/ packages/
COPY web/ web/
RUN pnpm install --frozen-lockfile
RUN pnpm --filter @nexusos/auth-service run db:generate
RUN pnpm --filter @nexusos/workflow-service run db:generate
RUN pnpm --filter @nexusos/finance-service run db:generate
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_WS_URL=$NEXT_PUBLIC_WS_URL
RUN pnpm build

FROM node:20-alpine
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@9 --activate && npm install -g pm2
COPY --from=builder /app/package.json /app/pnpm-lock.yaml /app/pnpm-workspace.yaml /app/turbo.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/apps ./apps
COPY --from=builder /app/web ./web
COPY --from=builder /app/packages ./packages
COPY ecosystem.config.js ./
EXPOSE 3000 3001
CMD ["pm2-runtime", "ecosystem.config.js"]
