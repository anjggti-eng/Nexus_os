import { NestFactory } from "@nestjs/core";
import { FinanceServiceModule } from "./finance-service.module";

async function bootstrap() {
  const app = await NestFactory.create(FinanceServiceModule);
  const port = process.env.FINANCE_SERVICE_PORT || 3007;
  await app.listen(port);
  console.log(`[FinanceService] Running on port ${port}`);
}
bootstrap();
