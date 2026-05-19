import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { ApiGatewayModule } from "./api-gateway.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix("api/v1");
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  });

  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  console.log(`[NexusOS] API Gateway running on port ${port}`);
}
bootstrap();
