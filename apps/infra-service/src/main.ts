import { NestFactory } from "@nestjs/core";
import { InfraServiceModule } from "./infra-service.module";

async function bootstrap() {
  const app = await NestFactory.create(InfraServiceModule);
  const port = process.env.INFRA_SERVICE_PORT || 3006;
  await app.listen(port);
  console.log(`[InfraService] Running on port ${port}`);
}
bootstrap();
