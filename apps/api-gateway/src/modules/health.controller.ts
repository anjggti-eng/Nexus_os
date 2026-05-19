import { Controller, Get } from "@nestjs/common";

@Controller()
export class GatewayHealthController {
  @Get("health")
  health() {
    return {
      status: "ok",
      service: "nexusos-api-gateway",
      timestamp: new Date().toISOString(),
    };
  }
}
