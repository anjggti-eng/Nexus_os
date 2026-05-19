#!/bin/bash
set -e

ENV=${1:-production}
echo "=== Deploy NexusOS ($ENV) ==="

# Pull latest
git pull origin main

# Copy env
if [ ! -f .env ]; then
  cp .env.example .env
  echo "Created .env from .env.example — configure before deploying"
  exit 1
fi

# Build and deploy
docker compose -f docker-compose.infra.yml up -d
sleep 5
docker compose up -d --build

# Run migrations
echo "Running database migrations..."
docker compose exec -T auth-service npx prisma db push --accept-data-loss 2>/dev/null || true

# Seed if needed
echo "Seeding database..."
docker compose exec -T auth-service npx ts-node prisma/seed.ts 2>/dev/null || true

# Health check
echo "Waiting for services..."
sleep 5

SERVICES=("api-gateway:3000" "auth-service:3002" "whatsapp-service:3003" "web:3000")
for service in "${SERVICES[@]}"; do
  name="${service%%:*}"
  port="${service##*:}"
  if curl -sf "http://localhost:$port/api/v1/health" > /dev/null 2>&1; then
    echo "✅ $name is healthy"
  else
    echo "❌ $name health check failed"
  fi
done

echo "=== Deploy complete ==="
