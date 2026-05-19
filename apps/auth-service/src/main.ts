import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AuthServiceModule } from "./auth-service.module";

async function bootstrap() {
  const app = await NestFactory.create(AuthServiceModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.AUTH_SERVICE_PORT || 3002;
  await app.listen(port);
  console.log(`[AuthService] Running on port ${port}`);
}
bootstrap();
