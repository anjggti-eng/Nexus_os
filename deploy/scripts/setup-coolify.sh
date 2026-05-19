#!/bin/bash
# NexusOS — Setup no Coolify LXC
# Execute no terminal web do Coolify (192.168.3.57)
# ou via SSH: ssh root@192.168.3.57 'bash -s' < setup-coolify.sh

set -e

echo "=== NexusOS — Coolify Setup ==="

# 1. Criar database no PostgreSQL da Orbitan
echo "[1/6] Criando database..."
PGPASSWORD='11bqHRIK9kaGpg33rfMM' psql -h 192.168.3.60 -U orbitan_admin -d postgres -c "CREATE DATABASE nexusos;" 2>/dev/null || echo "  -> database já existe"

# 2. Clonar o repo
echo "[2/6] Clonando repositório..."
cd /opt
rm -rf nexusos
git clone https://github.com/anjggti-eng/Nexus_os.git nexusos
cd nexusos

# 3. Instalar dependências
echo "[3/6] Instalando dependências..."
export PATH="$HOME/.local/share/pnpm:$PATH"
corepack enable
corepack prepare pnpm@9 --activate
pnpm install --frozen-lockfile || pnpm install

# 4. Build dos pacotes
echo "[4/6] Buildando pacotes..."
pnpm --filter @nexusos/shared-types build
pnpm --filter @nexusos/shared-events build
pnpm --filter @nexusos/shared-auth build
pnpm --filter @nexusos/shared-utils build
pnpm --filter @nexusos/auth-service build
pnpm --filter @nexusos/command-service build
pnpm --filter @nexusos/api-gateway build

# 5. Migrar banco e seed
echo "[5/6] Migrando banco de dados..."
export DATABASE_URL="postgresql://orbitan_admin:11bqHRIK9kaGpg33rfMM@192.168.3.60:5432/nexusos"
cd apps/auth-service
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts
cd ../..

# 6. Build do frontend
echo "[6/6] Buildando frontend..."
cd web
export NEXT_PUBLIC_API_URL=https://nexus.orbitan.com.br/api/v1
npx next build
cd ..

echo ""
echo "=== Setup completo ==="
echo ""
echo "Para iniciar manualmente:"
echo "  cd /opt/nexusos"
echo "  docker compose -f docker-compose.coolify.yml up -d"
echo ""
echo "Ou use o docker-compose.coolify.yml no recurso Docker Compose do Coolify."
