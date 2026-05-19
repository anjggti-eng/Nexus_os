# Deploy NexusOS no Coolify

## Recursos que você já tem na Orbitan que serão usados:

| Recurso Orbitan | Uso no NexusOS |
|---|---|
| **Coolify** | Orquestração dos containers dos microsserviços |
| **PostgreSQL** | Banco de dados principal (já configurado) |
| **n8n** | Workflows complementares (integração opcional) |
| **Cloudflare Tunnel** | Edge/WAF/SSL sem expor IP |
| **Uptime Kuma** | Monitoramento dos serviços |
| **WireGuard** | Acesso privado à malha interna |

## Estrutura de Deploy no Coolify

Cada microsserviço é um **recurso separate** no Coolify:

### 1. Infraestrutura (docker-compose.infra.yml)
- PostgreSQL → use o banco já existente da Orbitan
- Redis → novo container
- RabbitMQ → novo container
- MinIO → novo container

### 2. Microsserviços (cada um como recurso standalone)
| Serviço | Porta | Dockerfile |
|---|---|---|
| api-gateway | 3000 | apps/api-gateway/Dockerfile |
| auth-service | 3002 | apps/auth-service/Dockerfile |
| whatsapp-service | 3003 | apps/whatsapp-service/Dockerfile |
| command-service | 3004 | apps/command-service/Dockerfile |
| workflow-service | 3005 | apps/workflow-service/Dockerfile |
| infra-service | 3006 | apps/infra-service/Dockerfile |
| finance-service | 3007 | apps/finance-service/Dockerfile |
| analytics-service | 3008 | apps/analytics-service/Dockerfile |
| ai-service | 3009 | apps/ai-service/Dockerfile |

### 3. Frontend
- web → porta 3001, Dockerfile em web/Dockerfile

## Passo a passo no Coolify

1. Conecte o repositório git no Coolify
2. Para cada serviço, crie um recurso do tipo "Docker Compose" ou "Dockerfile"
3. Configure as variáveis de ambiente (baseadas no .env.example)
4. Aponte os domínios via Cloudflare Tunnel
5. O banco PostgreSQL pode ser o mesmo já existente na Orbitan

## Domínios sugeridos (via Cloudflare Tunnel)

```
api.orbitan.com.br → api-gateway:3000
app.orbitan.com.br → web:3001
```

## Variáveis de ambiente obrigatórias

```env
DATABASE_URL=postgresql://user:pass@postgres:5432/nexusos
REDIS_URL=redis://redis:6379
RABBITMQ_URL=amqp://rabbitmq:5672
JWT_ACCESS_SECRET=<gerar>
JWT_REFRESH_SECRET=<gerar>
```
