import { Controller, Get, Post, Param, Body } from "@nestjs/common";
import { ChargeService } from "./charge.service";

@Controller("charges")
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  @Get()
  async list() { return this.chargeService.list(); }

  @Post()
  async create(@Body() body: any) { return this.chargeService.create(body); }

  @Get(":id")
  async get(@Param("id") id: string) { return this.chargeService.get(id); }
}
