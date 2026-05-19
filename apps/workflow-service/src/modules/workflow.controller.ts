import { Controller, Get, Post, Patch, Param, Body } from "@nestjs/common";
import { WorkflowService } from "./workflow.service";

@Controller()
export class WorkflowController {
  constructor(private workflowService: WorkflowService) {}

  @Get()
  async list() {
    return this.workflowService.list();
  }

  @Post()
  async create(@Body() body: any) {
    return this.workflowService.create(body);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.workflowService.get(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() body: any) {
    return this.workflowService.update(id, body);
  }

  @Post(":id/execute")
  async execute(@Param("id") id: string) {
    return this.workflowService.execute(id);
  }

  @Get(":id/executions")
  async executions(@Param("id") id: string) {
    return this.workflowService.getExecutions(id);
  }
}
