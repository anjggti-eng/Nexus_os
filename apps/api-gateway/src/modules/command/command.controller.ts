import { Controller, Post, Get, Body } from "@nestjs/common";

@Controller()
export class CommandController {
  @Post("execute")
  async executeCommand(@Body() body: { input: string; sessionId?: string }) {
    return { message: "proxied to command-service" };
  }

  @Get("intents")
  async listIntents() {
    return { message: "proxied to command-service" };
  }

  @Get("history")
  async getHistory() {
    return { message: "proxied to command-service" };
  }
}
