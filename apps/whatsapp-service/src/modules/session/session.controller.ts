import { Controller, Get, Post, Delete, Param, Body } from "@nestjs/common";
import { SessionService } from "./session.service";

@Controller("sessions")
export class SessionController {
  constructor(private sessionService: SessionService) {}

  @Get()
  async list() {
    return this.sessionService.list();
  }

  @Post()
  async create(@Body() body: { name: string; webhookUrl?: string }) {
    return this.sessionService.create(body.name, body.webhookUrl);
  }

  @Get(":id")
  async get(@Param("id") id: string) {
    return this.sessionService.get(id);
  }

  @Delete(":id")
  async delete(@Param("id") id: string) {
    await this.sessionService.delete(id);
    return { message: "Session deleted" };
  }

  @Get(":id/qrcode")
  async qrcode(@Param("id") id: string) {
    return this.sessionService.getQrCode(id);
  }

  @Post(":id/send")
  async send(
    @Param("id") id: string,
    @Body() body: { to: string; text: string }
  ) {
    return this.sessionService.sendMessage(id, body.to, body.text);
  }
}
