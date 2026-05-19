#!/bin/bash
# NexusOS — Service Manager
# Usage: ./nexusos.sh {start|stop|restart|status|logs}

ACTION=${1:-status}
NEXUSOS_HOME=$(cd "$(dirname "$0")" && pwd)

SERVICES=(
  "auth-service:3002:Auth Service:node dist/main.js"
  "command-service:3004:Command Service:node dist/main.js"
  "api-gateway:3000:API Gateway:node dist/main.js"
  "web:3001:Web Frontend:npx next start -p 3001"
)

POSTGRES_HOME=/tmp/pg-local/usr/lib/postgresql/16
PGDATA=/home/john/pgdata
PGPORT=5433

export DATABASE_URL="postgresql://nexusos:nexusos@localhost:5433/nexusos"
export JWT_ACCESS_SECRET="dev-access-secret-nexusos-2026"
export JWT_REFRESH_SECRET="dev-refresh-secret-nexusos-2026"
export NEXT_PUBLIC_API_URL="http://localhost:3000/api/v1"
export NEXT_PUBLIC_WS_URL="http://localhost:3001"

start_postgres() {
  if $POSTGRES_HOME/bin/pg_isready -h localhost -p $PGPORT &>/dev/null; then
    echo "  ✅ PostgreSQL já está rodando"
  else
    echo "  🚀 Iniciando PostgreSQL..."
    $POSTGRES_HOME/bin/pg_ctl -D $PGDATA -l $PGDATA/logfile start
    sleep 2
  fi
}

start_service() {
  local dir=$1 port=$2 name=$3 cmd=$4
  if ss -tlnp | grep -q ":$port "; then
    echo "  ✅ $name já está rodando (:$port)"
  else
    echo "  🚀 Iniciando $name (:$port)..."
    cd "$NEXUSOS_HOME/apps/$dir" || return
    nohup $cmd > "/tmp/$dir.log" 2>&1 &
    disown
    sleep 2
    if ss -tlnp | grep -q ":$port "; then
      echo "  ✅ $name iniciado"
    else
      echo "  ❌ $name falhou ao iniciar"
    fi
  fi
}

stop_service() {
  local port=$1 name=$2
  local pid=$(ss -tlnp | grep ":$port " | grep -oP 'pid=\K[0-9]+')
  if [ -n "$pid" ]; then
    kill $pid 2>/dev/null
    echo "  ⛔ $name parado"
  else
    echo "  ⚪ $name não estava rodando"
  fi
}

case $ACTION in
  start)
    echo "=== Iniciando NexusOS ==="
    start_postgres
    start_service "auth-service" 3002 "Auth Service" "node dist/main.js"
    start_service "command-service" 3004 "Command Service" "node dist/main.js"
    start_service "api-gateway" 3000 "API Gateway" "node dist/main.js"
    cd "$NEXUSOS_HOME/web" && nohup npx next start -p 3001 > /tmp/web.log 2>&1 &
    disown
    sleep 3
    if ss -tlnp | grep -q ":3001 "; then
      echo "  ✅ Web Frontend iniciado"
    else
      echo "  ❌ Web Frontend falhou ao iniciar"
    fi
    echo "=== NexusOS iniciado ==="
    ;;

  stop)
    echo "=== Parando NexusOS ==="
    stop_service 3000 "API Gateway"
    stop_service 3001 "Web Frontend"
    stop_service 3002 "Auth Service"
    stop_service 3004 "Command Service"
    echo "=== NexusOS parado ==="
    ;;

  restart)
    $0 stop
    sleep 2
    $0 start
    ;;

  status)
    echo "=== NexusOS Status ==="
    for port in 3000 3001 3002 3004; do
      case $port in
        3000) name="API Gateway" ;;
        3001) name="Web Frontend" ;;
        3002) name="Auth Service" ;;
        3004) name="Command Service" ;;
      esac
      if ss -tlnp | grep -q ":$port "; then
        pid=$(ss -tlnp | grep ":$port " | grep -oP 'pid=\K[0-9]+')
        uptime=$(ps -o etime= -p $pid 2>/dev/null | xargs)
        echo "  ✅ $name (:$port) — PID $pid — uptime $uptime"
      else
        echo "  ❌ $name (:$port) — PARADO"
      fi
    done
    echo ""
    if $POSTGRES_HOME/bin/pg_isready -h localhost -p $PGPORT &>/dev/null; then
      echo "  ✅ PostgreSQL (:5433) — accepting connections"
    else
      echo "  ❌ PostgreSQL (:5433) — PARADO"
    fi
    ;;

  logs)
    SERVICE=${2:-all}
    case $SERVICE in
      api|api-gateway)    tail -f /tmp/api-gateway.log ;;
      auth|auth-service)  tail -f /tmp/auth-service.log ;;
      command|command-service) tail -f /tmp/command-service.log ;;
      web|frontend)       tail -f /tmp/web.log ;;
      postgres)          tail -f /home/john/pgdata/logfile ;;
      *) echo "Usage: $0 logs {api|auth|command|web|postgres}" ;;
    esac
    ;;

  *)
    echo "Uso: ./nexusos.sh {start|stop|restart|status|logs}"
    ;;
esac
