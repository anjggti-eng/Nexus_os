import { Controller, Post, Get, Body } from "@nestjs/common";
import { CommandParser } from "./command.parser";
import { CommandRouter } from "./command.router";

@Controller()
export class CommandController {
  constructor(
    private parser: CommandParser,
    private router: CommandRouter
  ) {}

  @Post("execute")
  async execute(@Body() body: { input: string; sessionId?: string }) {
    const parsed = this.parser.parse(body.input);
    if (!parsed) {
      return { success: false, message: "Could not parse command" };
    }
    return this.router.route(parsed);
  }

  @Get("intents")
  async intents() {
    return this.parser.getIntents();
  }

  @Get("history")
  async history() {
    return { message: "Command history endpoint" };
  }
}
