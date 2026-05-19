import { Controller, Get, Post, Param, Body, Delete } from "@nestjs/common";

@Controller()
export class WhatsAppController {
  @Get("sessions")
  async listSessions() {
    return { message: "proxied to whatsapp-service" };
  }

  @Post("sessions")
  async createSession(@Body() body: { name: string; webhookUrl?: string }) {
    return { message: "proxied to whatsapp-service" };
  }

  @Get("sessions/:id")
  async getSession(@Param("id") id: string) {
    return { message: "proxied to whatsapp-service" };
  }

  @Delete("sessions/:id")
  async deleteSession(@Param("id") id: string) {
    return { message: "proxied to whatsapp-service" };
  }

  @Post("sessions/:id/send")
  async sendMessage(
    @Param("id") id: string,
    @Body() body: { to: string; text?: string; media?: string }
  ) {
    return { message: "proxied to whatsapp-service" };
  }

  @Get("sessions/:id/qrcode")
  async getQrCode(@Param("id") id: string) {
    return { message: "proxied to whatsapp-service" };
  }
}
