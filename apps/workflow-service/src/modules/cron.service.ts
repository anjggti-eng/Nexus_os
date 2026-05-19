import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { PrismaService } from "../prisma.service";
import { WorkflowExecutor } from "./workflow.executor";

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    private prisma: PrismaService,
    private executor: WorkflowExecutor
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async checkScheduledWorkflows() {
    const workflows = await this.prisma.workflow.findMany({
      where: {
        status: "ACTIVE",
        trigger: {
          path: ["type"],
          equals: "SCHEDULE",
        },
      },
    });

    for (const workflow of workflows) {
      try {
        await this.executor.execute(workflow);
        this.logger.log(`Executed scheduled workflow: ${workflow.name}`);
      } catch (err) {
        this.logger.error(`Failed to execute workflow ${workflow.name}: ${err}`);
      }
    }
  }
}
