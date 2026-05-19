import { Controller, Get, Post, Body } from "@nestjs/common";
import { CustomerService } from "./customer.service";

@Controller("customers")
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  async list() { return this.customerService.list(); }

  @Post()
  async create(@Body() body: any) { return this.customerService.create(body); }
}
