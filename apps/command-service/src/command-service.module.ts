import { Module } from "@nestjs/common";
import { CommandEngineModule } from "./modules/command-engine.module";

@Module({
  imports: [CommandEngineModule],
})
export class CommandServiceModule {}
