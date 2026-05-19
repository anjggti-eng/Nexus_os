import { Controller, Post, Get, Body } from "@nestjs/common";

@Controller()
export class AiController {
  @Post("chat")
  async chat(@Body() body: { message: string; sessionId?: string }) {
    return { message: "proxied to ai-service" };
  }

  @Post("suggest")
  async suggest(@Body() body: { context: string }) {
    return { message: "proxied to ai-service" };
  }

  @Get("memory")
  async getMemory() {
    return { message: "proxied to ai-service" };
  }
}
