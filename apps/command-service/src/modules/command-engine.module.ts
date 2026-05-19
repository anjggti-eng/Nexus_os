import { Module } from "@nestjs/common";
import { CommandController } from "./command.controller";
import { CommandParser } from "./command.parser";
import { CommandRouter } from "./command.router";

@Module({
  controllers: [CommandController],
  providers: [CommandParser, CommandRouter],
  exports: [CommandParser, CommandRouter],
})
export class CommandEngineModule {}
