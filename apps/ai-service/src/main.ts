import { NestFactory } from "@nestjs/core";
import { AiServiceModule } from "./ai-service.module";

async function bootstrap() {
  const app = await NestFactory.create(AiServiceModule);
  const port = process.env.AI_SERVICE_PORT || 3009;
  await app.listen(port);
  console.log(`[AiService] Running on port ${port}`);
}
bootstrap();
