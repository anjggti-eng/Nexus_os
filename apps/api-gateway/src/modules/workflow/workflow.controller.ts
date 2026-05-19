import { Controller, Get, Post, Param, Body, Patch } from "@nestjs/common";

@Controller()
export class WorkflowController {
  @Get()
  async listWorkflows() {
    return { message: "proxied to workflow-service" };
  }

  @Post()
  async createWorkflow(@Body() body: any) {
    return { message: "proxied to workflow-service" };
  }

  @Get(":id")
  async getWorkflow(@Param("id") id: string) {
    return { message: "proxied to workflow-service" };
  }

  @Patch(":id")
  async updateWorkflow(@Param("id") id: string, @Body() body: any) {
    return { message: "proxied to workflow-service" };
  }

  @Post(":id/execute")
  async executeWorkflow(@Param("id") id: string) {
    return { message: "proxied to workflow-service" };
  }

  @Get(":id/executions")
  async getExecutions(@Param("id") id: string) {
    return { message: "proxied to workflow-service" };
  }
}
