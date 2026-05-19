import { Controller, Get, Post, Body } from "@nestjs/common";

@Controller()
export class InfraController {
  @Get("servers")
  async listServers() {
    return { message: "proxied to infra-service" };
  }

  @Get("containers")
  async listContainers() {
    return { message: "proxied to infra-service" };
  }

  @Post("deploy")
  async deploy(@Body() body: { service: string; branch?: string }) {
    return { message: "proxied to infra-service" };
  }

  @Post("containers/restart")
  async restartContainer(@Body() body: { name: string }) {
    return { message: "proxied to infra-service" };
  }

  @Post("ssh/exec")
  async sshCommand(@Body() body: { host: string; command: string }) {
    return { message: "proxied to infra-service" };
  }
}
