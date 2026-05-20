module.exports = {
  apps: [
    {
      name: "api-gateway",
      script: "apps/api-gateway/dist/main.js",
      env: { API_PORT: "3000" },
    },
    {
      name: "auth-service",
      script: "apps/auth-service/dist/main.js",
      env: { AUTH_SERVICE_PORT: "3002" },
    },
    {
      name: "command-service",
      script: "apps/command-service/dist/main.js",
      env: { COMMAND_SERVICE_PORT: "3004" },
    },
    {
      name: "whatsapp-service",
      script: "apps/whatsapp-service/dist/main.js",
      env: { WHATSAPP_SERVICE_PORT: "3003" },
    },
    {
      name: "workflow-service",
      script: "apps/workflow-service/dist/main.js",
      env: { WORKFLOW_SERVICE_PORT: "3005" },
    },
    {
      name: "infra-service",
      script: "apps/infra-service/dist/main.js",
      env: { INFRA_SERVICE_PORT: "3006" },
    },
    {
      name: "finance-service",
      script: "apps/finance-service/dist/main.js",
      env: { FINANCE_SERVICE_PORT: "3007" },
    },
    {
      name: "analytics-service",
      script: "apps/analytics-service/dist/main.js",
      env: { ANALYTICS_SERVICE_PORT: "3008" },
    },
    {
      name: "ai-service",
      script: "apps/ai-service/dist/main.js",
      env: { AI_SERVICE_PORT: "3009" },
    },
    {
      name: "web",
      cwd: "/app/web",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3001",
      env: { NODE_ENV: "production" },
    },
  ],
};
