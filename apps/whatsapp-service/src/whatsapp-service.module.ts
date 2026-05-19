import { Module } from "@nestjs/common";
import { SessionModule } from "./modules/session/session.module";
import { MessageModule } from "./modules/message/message.module";
import { RedisModule } from "./redis.module";

@Module({
  imports: [RedisModule, SessionModule, MessageModule],
})
export class WhatsAppServiceModule {}
