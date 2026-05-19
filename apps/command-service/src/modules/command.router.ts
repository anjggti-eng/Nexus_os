import { Injectable } from "@nestjs/common";
import { ParsedCommand, CommandResult } from "@nexusos/shared-types";

@Injectable()
export class CommandRouter {
  async route(command: ParsedCommand): Promise<CommandResult> {
    const startTime = Date.now();
    const actionLog: string[] = [];

    try {
      actionLog.push(`Module: ${command.module}`);
      actionLog.push(`Action: ${command.action}`);
      actionLog.push(`Args: ${JSON.stringify(command.args)}`);

      const result = await this.execute(command);

      return {
        success: true,
        message: result.message,
        data: result.data,
        executionTimeMs: Date.now() - startTime,
        actionLog,
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message || "Command execution failed",
        executionTimeMs: Date.now() - startTime,
        actionLog,
      };
    }
  }

  private async execute(command: ParsedCommand): Promise<{ message: string; data?: unknown }> {
    switch (command.module) {
      case "infra":
        return this.handleInfra(command);
      case "whatsapp":
        return this.handleWhatsApp(command);
      case "finance":
        return this.handleFinance(command);
      case "workflow":
        return this.handleWorkflow(command);
      case "ai":
        return this.handleAI(command);
      default:
        return { message: `Module ${command.module} not implemented yet` };
    }
  }

  private async handleInfra(command: ParsedCommand): Promise<{ message: string; data?: unknown }> {
    if (command.action === "restart_container") {
      return {
        message: `Container ${command.args.target || "unknown"} restart initiated`,
        data: { container: command.args.target, status: "restarting" },
      };
    }
    if (command.action === "get_status") {
      const target = command.args.target || "all";
      return {
        message: target === "all"
          ? "Todos os serviços estão operacionais ✅"
          : `${target} está rodando ✅`,
        data: { status: "healthy", target },
      };
    }
    if (command.action === "deploy_service") {
      return {
        message: `Deploy de ${command.args.service} iniciado na branch ${command.args.branch || "main"}`,
        data: { service: command.args.service, branch: command.args.branch || "main", status: "deploying" },
      };
    }
    return { message: "Unknown infra command" };
  }

  private async handleWhatsApp(command: ParsedCommand): Promise<{ message: string; data?: unknown }> {
    if (command.action === "list_sessions") {
      return { message: "Listando sessões ativas...", data: { sessions: [] } };
    }
    return { message: "Unknown whatsapp command" };
  }

  private async handleFinance(command: ParsedCommand): Promise<{ message: string; data?: unknown }> {
    if (command.action === "create_charge") {
      return {
        message: `💳 Cobrança de R$ ${command.args.amount} criada para ${command.args.customer}`,
        data: { customer: command.args.customer, amount: command.args.amount },
      };
    }
    if (command.action === "generate_report") {
      return { message: "📊 Relatório financeiro gerado", data: { period: command.args.period || "month" } };
    }
    return { message: "Unknown finance command" };
  }

  private async handleWorkflow(command: ParsedCommand): Promise<{ message: string; data?: unknown }> {
    if (command.action === "list_workflows") {
      return { message: "Listando workflows...", data: { workflows: [] } };
    }
    return { message: "Unknown workflow command" };
  }

  private async handleAI(command: ParsedCommand): Promise<{ message: string; data?: unknown }> {
    if (command.action === "list_commands") {
      return {
        message: "Comandos disponíveis:\n- infra: reiniciar, status, deploy\n- whatsapp: sessoes\n- finance: cobrar, relatorio\n- workflows\n- ajuda",
      };
    }
    return { message: "Unknown AI command" };
  }
}
