import { NestFactory } from "@nestjs/core";
import { WorkflowServiceModule } from "./workflow-service.module";

async function bootstrap() {
  const app = await NestFactory.create(WorkflowServiceModule);
  const port = process.env.WORKFLOW_SERVICE_PORT || 3005;
  await app.listen(port);
  console.log(`[WorkflowService] Running on port ${port}`);
}
bootstrap();
