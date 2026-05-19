import { NestFactory } from "@nestjs/core";
import { CommandServiceModule } from "./command-service.module";

async function bootstrap() {
  const app = await NestFactory.create(CommandServiceModule);
  const port = process.env.COMMAND_SERVICE_PORT || 3004;
  await app.listen(port);
  console.log(`[CommandService] Running on port ${port}`);
}
bootstrap();
