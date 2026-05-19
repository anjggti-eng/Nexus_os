import { Injectable, OnModuleDestroy } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService extends Redis implements OnModuleDestroy {
  constructor() {
    super({
      host: process.env.REDIS_HOST || "redis",
      port: parseInt(process.env.REDIS_PORT || "6379"),
      password: process.env.REDIS_PASSWORD || "nexusos",
      retryStrategy: (times) => Math.min(times * 50, 2000),
    });
  }

  onModuleDestroy() {
    this.disconnect();
  }
}
