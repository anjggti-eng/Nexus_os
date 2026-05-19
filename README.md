# NexusOS — WhatsApp Operational System

Transforme o WhatsApp em um terminal operacional, centro de automação e painel empresarial com copiloto infra + financeiro + operação.

```
                    ┌─────────────────┐
                    │   WhatsApp      │
                    └────────┬────────┘
                             │
                ┌────────────▼────────────┐
                │ WhatsApp Gateway Cluster │
                └────────────┬────────────┘
                             │
                ┌────────────▼────────────┐
                │      API Gateway         │
                └────────────┬────────────┘
                             │
      ┌──────────────────────┼──────────────────────┐
      │                      │                      │
 ┌────▼────────┐   ┌────────▼────────┐   ┌────────▼────────┐
 │ Command     │   │ Workflow        │   │ Realtime        │
 │ Engine      │   │ Engine          │   │ Engine          │
 └────┬────────┘   └────────┬────────┘   └────────┬────────┘
      │                     │                     │
 ┌────▼──────────────────────────────────────────▼─────────┐
 │                  Internal Event Bus (RabbitMQ)           │
 └────┬──────────────────────────────────────────┬─────────┘
      │                                          │
 ┌────▼────────┐                      ┌──────────▼─────────┐
 │ Microservices│                      │ AI Service         │
 │ (8 serviços)│                      │ (OpenAI + Memória)  │
 └────┬────────┘                      └──────────┬─────────┘
      │                                          │
 ┌────▼──────────────────────────────────────────▼─────────┐
 │ PostgreSQL │ Redis │ RabbitMQ │ ClickHouse │ MinIO      │
 └─────────────────────────────────────────────────────────┘
```

## Stack

| Camada | Tecnologia |
|---|---|
| Backend Core | NestJS + TypeScript (modular, enterprise, microservices) |
| WhatsApp Gateway | Baileys + WebSocket + Redis |
| Banco Principal | PostgreSQL 16 + Prisma ORM |
| Cache + Realtime | Redis |
| Filas | RabbitMQ |
| Logs/Metrics | ClickHouse (opcional) |
| Storage | MinIO (S3-compatible) |
| Frontend | Next.js 14 + Tailwind CSS |
| IA | OpenAI API + LangChain (fallback local: Ollama) |
| Auth | JWT + Refresh Tokens + RBAC |
| Infra | Docker + Docker Compose |

## Arquitetura

### Microserviços

| Serviço | Porta | Função |
|---|---|---|
| `api-gateway` | 3000 | Proxy REST + WebSocket para todos os serviços |
| `auth-service` | 3002 | Login, JWT, refresh token, RBAC, auditoria |
| `whatsapp-service` | 3003 | Sessões WhatsApp, QR code, envio/recebimento |
| `command-service` | 3004 | Parser de linguagem natural, roteamento de comandos |
| `workflow-service` | 3005 | Automações, triggers, cron jobs |
| `infra-service` | 3006 | Docker API, SSH, deploy, Proxmox |
| `finance-service` | 3007 | Cobranças PIX, boletos, clientes |
| `analytics-service` | 3008 | Dashboard, métricas, relatórios |
| `ai-service` | 3009 | NLP, memória operacional, sugestões |

### Banco Multi-Tenant

Estratégia: `shared-db + tenant_id`

14 tabelas principais: Tenant, User, DeviceSession, WhatsAppSession, MessageLog, CommandIntent, CommandLog, Workflow, WorkflowExecution, WorkflowLog, Customer, Charge, PixTransaction, AuditLog.

### Engine de Comandos

Entrada em linguagem natural → parse → módulo + ação + args → execução.

```
"reinicia api produção"
  → module: infra, action: restart_container, target: "api produção"

"cobrar João 150"
  → module: finance, action: create_charge, customer: "joão", amount: 150

"status servidores"
  → module: infra, action: get_status, target: "servidores"
```

## Como Rodar

### Requisitos

- Node.js 20+
- pnpm 9+
- PostgreSQL 16
- Docker + Docker Compose (para Redis, RabbitMQ, MinIO)

### Desenvolvimento

```bash
# Instalar dependências
pnpm install

# Build dos pacotes compartilhados
pnpm --filter @nexusos/shared-types build
pnpm --filter @nexusos/shared-events build
pnpm --filter @nexusos/shared-auth build
pnpm --filter @nexusos/shared-utils build

# Configurar banco
cp .env.example .env  # editar DATABASE_URL
cd apps/auth-service && npx prisma generate && npx prisma db push && npx ts-node prisma/seed.ts

# Iniciar serviços
./nexusos.sh start
```

### Produção (Docker)

```bash
docker compose -f docker-compose.infra.yml up -d
docker compose up -d --build
```

## API

### Autenticação

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@orbitan.com.br",
  "password": "admin123",
  "tenantId": "<tenant-uuid>"
}
```

### Comandos

```http
POST /api/v1/commands/execute
Authorization: Bearer <token>
Content-Type: application/json

{
  "input": "status servidores"
}
```

## Deploy na Orbitan

A infraestrutura Orbitan já oferece:
- Coolify → orquestração de containers
- PostgreSQL → banco multi-tenant
- Cloudflare Tunnel → edge/WAF/SSL
- Uptime Kuma → monitoramento
- WireGuard → acesso privado

## Licença

MIT © 2026 Orbitan / NexusOS
