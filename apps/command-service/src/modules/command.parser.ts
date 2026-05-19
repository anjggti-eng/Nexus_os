import { Injectable } from "@nestjs/common";
import { ParsedCommand, CommandModule, CommandIntent } from "@nexusos/shared-types";

@Injectable()
export class CommandParser {
  private intents: CommandIntent[] = [
    {
      id: "infra-restart",
      module: CommandModule.INFRA,
      patterns: ["reinicia", "restart", "reiniciar", "reboot"],
      action: "restart_container",
      params: [
        { name: "target", type: "string", required: true, description: "Container or service name" },
      ],
      description: "Restart a container or service",
    },
    {
      id: "infra-status",
      module: CommandModule.INFRA,
      patterns: ["status", "saude", "health", "como esta"],
      action: "get_status",
      params: [
        { name: "target", type: "string", required: false, description: "Specific service to check" },
      ],
      description: "Check infrastructure status",
    },
    {
      id: "infra-deploy",
      module: CommandModule.INFRA,
      patterns: ["deploy", "publicar", "implantar"],
      action: "deploy_service",
      params: [
        { name: "service", type: "string", required: true, description: "Service name to deploy" },
        { name: "branch", type: "string", required: false, description: "Git branch" },
      ],
      description: "Deploy a service",
    },
    {
      id: "whatsapp-status",
      module: CommandModule.WHATSAPP,
      patterns: ["sessoes", "sessions", "status whats"],
      action: "list_sessions",
      params: [],
      description: "List all WhatsApp sessions",
    },
    {
      id: "finance-charge",
      module: CommandModule.FINANCE,
      patterns: ["cobrar", "charge", "criar cobranca", "faturar"],
      action: "create_charge",
      params: [
        { name: "customer", type: "string", required: true },
        { name: "amount", type: "number", required: true },
        { name: "description", type: "string", required: false },
      ],
      description: "Create a charge for a customer",
    },
    {
      id: "finance-report",
      module: CommandModule.FINANCE,
      patterns: ["relatorio", "report", "financeiro"],
      action: "generate_report",
      params: [
        { name: "period", type: "enum", required: false, enum: ["today", "week", "month"], description: "Report period" },
      ],
      description: "Generate financial report",
    },
    {
      id: "ai-help",
      module: CommandModule.AI,
      patterns: ["ajuda", "help", "comandos", "o que sabe"],
      action: "list_commands",
      params: [],
      description: "List all available commands",
    },
    {
      id: "workflow-list",
      module: CommandModule.WORKFLOW,
      patterns: ["workflows", "automacoes", "automacoes"],
      action: "list_workflows",
      params: [],
      description: "List all workflows",
    },
  ];

  parse(input: string): ParsedCommand | null {
    const normalized = input.toLowerCase().trim();
    const words = normalized.split(/\s+/);

    for (const intent of this.intents) {
      const matched = intent.patterns.some((p) => normalized.includes(p));
      if (!matched) continue;

      const args: Record<string, string> = {};

      const patternIndex = words.findIndex((w) =>
        intent.patterns.some((p) => w === p || normalized.startsWith(p))
      );

      for (const param of intent.params) {
        if (param.type === "number") {
          const numWord = words.find((w) => /^\d+[,.]?\d*$/.test(w));
          if (numWord) {
            args[param.name] = numWord.replace(",", ".");
          }
        } else if (param.type === "string" && param.name === "description" && args["customer"]) {
          // description after amount if present
        } else if (param.type === "string") {
          if (patternIndex >= 0 && patternIndex < words.length - 1) {
            const afterPattern = words.slice(patternIndex + 1);
            if (param.name === "customer" || param.name === "target" || param.name === "service") {
              args[param.name] = afterPattern
                .filter((w) => !/^\d+[,.]?\d*$/.test(w))
                .join(" ");
            }
          }
        }
      }

      return {
        raw: input,
        module: intent.module,
        action: intent.action,
        args,
        confidence: 0.85,
      };
    }

    return null;
  }

  getIntents(): CommandIntent[] {
    return this.intents;
  }
}
