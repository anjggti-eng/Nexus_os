import { Module } from "@nestjs/common";
import { ChargeModule } from "./modules/charge/charge.module";
import { CustomerModule } from "./modules/customer/customer.module";
import { PrismaModule } from "./prisma.module";

@Module({
  imports: [PrismaModule, ChargeModule, CustomerModule],
})
export class FinanceServiceModule {}
