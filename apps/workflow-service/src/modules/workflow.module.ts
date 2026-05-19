import { Module } from "@nestjs/common";
import { WorkflowController } from "./workflow.controller";
import { WorkflowService } from "./workflow.service";
import { WorkflowExecutor } from "./workflow.executor";
import { CronService } from "./cron.service";

@Module({
  controllers: [WorkflowController],
  providers: [WorkflowService, WorkflowExecutor, CronService],
  exports: [WorkflowService],
})
export class WorkflowModule {}
