import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { WorkflowModule } from "./modules/workflow.module";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [ScheduleModule.forRoot(), PrismaModule, WorkflowModule],
})
export class WorkflowServiceModule {}
