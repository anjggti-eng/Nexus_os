import { NestFactory } from "@nestjs/core";
import { AnalyticsServiceModule } from "./analytics-service.module";

async function bootstrap() {
  const app = await NestFactory.create(AnalyticsServiceModule);
  const port = process.env.ANALYTICS_SERVICE_PORT || 3008;
  await app.listen(port);
  console.log(`[AnalyticsService] Running on port ${port}`);
}
bootstrap();
