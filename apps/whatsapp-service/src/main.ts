import { NestFactory } from "@nestjs/core";
import { WhatsAppServiceModule } from "./whatsapp-service.module";

async function bootstrap() {
  const app = await NestFactory.create(WhatsAppServiceModule);
  const port = process.env.WHATSAPP_SERVICE_PORT || 3003;
  await app.listen(port);
  console.log(`[WhatsAppService] Running on port ${port}`);
}
bootstrap();
