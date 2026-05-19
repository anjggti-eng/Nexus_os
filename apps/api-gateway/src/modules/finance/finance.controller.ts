import { Controller, Get, Post, Param, Body } from "@nestjs/common";

@Controller()
export class FinanceController {
  @Get("charges")
  async listCharges() {
    return { message: "proxied to finance-service" };
  }

  @Post("charges")
  async createCharge(@Body() body: any) {
    return { message: "proxied to finance-service" };
  }

  @Get("charges/:id")
  async getCharge(@Param("id") id: string) {
    return { message: "proxied to finance-service" };
  }

  @Get("customers")
  async listCustomers() {
    return { message: "proxied to finance-service" };
  }

  @Post("customers")
  async createCustomer(@Body() body: any) {
    return { message: "proxied to finance-service" };
  }

  @Post("pix/webhook")
  async pixWebhook(@Body() body: any) {
    return { message: "proxied to finance-service" };
  }
}
