import { Controller, Post, Get, Body } from "@nestjs/common";
import { AiService } from "./ai.service";

@Controller()
export class AiController {
  constructor(private ai: AiService) {}

  @Post("chat")
  async chat(@Body() body: { message: string; sessionId?: string }) {
    return this.ai.chat(body.message);
  }

  @Post("suggest")
  async suggest(@Body() body: { context: string }) {
    return this.ai.suggest(body.context);
  }

  @Get("memory")
  async memory() {
    return this.ai.getMemory();
  }
}
