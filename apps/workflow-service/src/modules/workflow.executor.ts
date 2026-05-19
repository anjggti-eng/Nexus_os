import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

@Injectable()
export class WorkflowExecutor {
  constructor(private prisma: PrismaService) {}

  async execute(workflow: any) {
    const execution = await this.prisma.workflowExecution.create({
      data: {
        workflowId: workflow.id,
        tenantId: workflow.tenantId,
        trigger: workflow.trigger.type,
        input: { trigger: workflow.trigger },
      },
    });

    try {
      for (const action of workflow.actions) {
        const log = await this.prisma.workflowLog.create({
          data: {
            executionId: execution.id,
            actionId: action.id,
            status: "RUNNING",
            input: action.config,
          },
        });

        const actionStart = Date.now();
        try {
          const result = await this.runAction(action);
          await this.prisma.workflowLog.update({
            where: { id: log.id },
            data: {
              status: "SUCCESS",
              output: result,
              durationMs: Date.now() - actionStart,
            },
          });
        } catch (err: any) {
          await this.prisma.workflowLog.update({
            where: { id: log.id },
            data: {
              status: "FAILURE",
              error: err.message,
              durationMs: Date.now() - actionStart,
            },
          });
          throw err;
        }
      }

      await this.prisma.workflowExecution.update({
        where: { id: execution.id },
        data: { status: "SUCCESS", completedAt: new Date() },
      });

      await this.prisma.workflow.update({
        where: { id: workflow.id },
        data: {
          executionCount: { increment: 1 },
          lastExecutedAt: new Date(),
        },
      });

      return { executionId: execution.id, status: "SUCCESS" };
    } catch (err: any) {
      await this.prisma.workflowExecution.update({
        where: { id: execution.id },
        data: { status: "FAILURE", error: err.message, completedAt: new Date() },
      });
      return { executionId: execution.id, status: "FAILURE", error: err.message };
    }
  }

  private async runAction(action: any): Promise<any> {
    switch (action.type) {
      case "send_message":
        return { sent: true, to: action.config.to, text: action.config.text };
      case "http_request":
        return { requested: true, url: action.config.url };
      case "delay":
        await new Promise((r) => setTimeout(r, action.config.ms || 1000));
        return { delayed: true, ms: action.config.ms };
      case "log":
        return { logged: true, message: action.config.message };
      default:
        return { action: action.type, status: "not_implemented" };
    }
  }
}
