import { Controller, Get, Post, Body } from "@nestjs/common";
import { DockerService } from "./docker.service";

@Controller("docker")
export class DockerController {
  constructor(private docker: DockerService) {}

  @Get("containers")
  async listContainers() {
    return this.docker.listContainers();
  }

  @Post("containers/restart")
  async restartContainer(@Body() body: { name: string }) {
    return this.docker.restartContainer(body.name);
  }

  @Post("deploy")
  async deploy(@Body() body: { service: string; branch?: string }) {
    return this.docker.deploy(body.service, body.branch);
  }
}
