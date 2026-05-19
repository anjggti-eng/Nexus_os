#!/bin/bash
set -e

echo "=== NexusOS VPS Setup ==="

# System updates
apt update && apt upgrade -y
apt install -y \
  curl \
  git \
  htop \
  net-tools \
  ufw \
  fail2ban

# Docker
if ! command -v docker &> /dev/null; then
  curl -fsSL https://get.docker.com | bash
  systemctl enable --now docker
fi

# Docker Compose plugin
if ! command -v docker compose &> /dev/null; then
  DOCKER_CONFIG=${DOCKER_CONFIG:-$HOME/.docker}
  mkdir -p $DOCKER_CONFIG/cli-plugins
  curl -SL "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o $DOCKER_CONFIG/cli-plugins/docker-compose
  chmod +x $DOCKER_CONFIG/cli-plugins/docker-compose
fi

# pnpm
if ! command -v pnpm &> /dev/null; then
  corepack enable
  corepack prepare pnpm@9 --activate
fi

# Node.js 20
if ! command -v node &> /dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt install -y nodejs
fi

# Firewall
ufw allow 22/tcp
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 3000/tcp
ufw --force enable

# Fail2ban
systemctl enable --now fail2ban

# Create network
docker network create nexusos-network 2>/dev/null || true

# Clone repo (run manually after setup)
echo ""
echo "=== Setup Complete ==="
echo ""
echo "Next steps:"
echo "  1. Clone the repository: git clone <repo-url> /opt/nexusos"
echo "  2. Copy .env.example to .env and configure"
echo "  3. Run: docker compose -f docker-compose.infra.yml up -d"
echo "  4. Run: docker compose up -d"
echo "  5. Run: docker compose exec auth-service npx prisma db push"
echo "  6. Run: docker compose exec auth-service npx ts-node prisma/seed.ts"
echo ""
