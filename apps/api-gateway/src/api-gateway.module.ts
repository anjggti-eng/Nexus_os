import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { RouterModule } from "@nestjs/core";
import { AuthModule } from "./modules/auth/auth.module";
import { WhatsAppModule } from "./modules/whatsapp/whatsapp.module";
import { WorkflowModule } from "./modules/workflow/workflow.module";
import { CommandModule } from "./modules/command/command.module";
import { InfraModule } from "./modules/infra/infra.module";
import { FinanceModule } from "./modules/finance/finance.module";
import { AnalyticsModule } from "./modules/analytics/analytics.module";
import { AiModule } from "./modules/ai/ai.module";
import { GatewayModule } from "./modules/gateway.module";

@Module({
  imports: [
    GatewayModule,
    AuthModule,
    WhatsAppModule,
    WorkflowModule,
    CommandModule,
    InfraModule,
    FinanceModule,
    AnalyticsModule,
    AiModule,
    RouterModule.register([
      { path: "auth", module: AuthModule },
      { path: "whatsapp", module: WhatsAppModule },
      { path: "workflows", module: WorkflowModule },
      { path: "commands", module: CommandModule },
      { path: "infra", module: InfraModule },
      { path: "finance", module: FinanceModule },
      { path: "analytics", module: AnalyticsModule },
      { path: "ai", module: AiModule },
    ]),
  ],
})
export class ApiGatewayModule {}
