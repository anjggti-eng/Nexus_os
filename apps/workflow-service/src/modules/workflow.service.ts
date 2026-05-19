import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { WorkflowExecutor } from "./workflow.executor";

@Injectable()
export class WorkflowService {
  constructor(
    private prisma: PrismaService,
    private executor: WorkflowExecutor
  ) {}

  async list() {
    return this.prisma.workflow.findMany({ orderBy: { createdAt: "desc" } });
  }

  async get(id: string) {
    const workflow = await this.prisma.workflow.findUnique({ where: { id } });
    if (!workflow) throw new NotFoundException("Workflow not found");
    return workflow;
  }

  async create(data: {
    tenantId: string;
    name: string;
    description?: string;
    trigger: any;
    actions: any[];
  }) {
    return this.prisma.workflow.create({
      data: {
        tenantId: data.tenantId,
        name: data.name,
        description: data.description,
        trigger: data.trigger,
        actions: data.actions,
      },
    });
  }

  async update(id: string, data: any) {
    await this.get(id);
    return this.prisma.workflow.update({ where: { id }, data });
  }

  async execute(id: string) {
    const workflow = await this.get(id);
    return this.executor.execute(workflow);
  }

  async getExecutions(workflowId: string) {
    await this.get(workflowId);
    return this.prisma.workflowExecution.findMany({
      where: { workflowId },
      orderBy: { startedAt: "desc" },
      take: 50,
    });
  }
}
