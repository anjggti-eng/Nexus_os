import { Injectable, Logger } from "@nestjs/common";
import Docker from "dockerode";

@Injectable()
export class DockerService {
  private docker: Docker;
  private logger = new Logger(DockerService.name);

  constructor() {
    this.docker = new Docker({
      socketPath: process.env.DOCKER_HOST || "/var/run/docker.sock",
    });
  }

  async listContainers() {
    const containers = await this.docker.listContainers({ all: true });
    return containers.map((c) => ({
      id: c.Id.slice(0, 12),
      name: c.Names[0]?.replace("/", ""),
      image: c.Image,
      status: c.State,
      ports: c.Ports?.map((p) => `${p.PublicPort || ""}->${p.PrivatePort}`),
      createdAt: c.Created,
    }));
  }

  async restartContainer(name: string) {
    try {
      const container = this.docker.getContainer(name);
      await container.restart();
      return { success: true, container: name };
    } catch (err: any) {
      this.logger.error(`Failed to restart ${name}: ${err.message}`);
      throw err;
    }
  }

  async deploy(service: string, branch = "main") {
    return {
      service,
      branch,
      status: "deploy_initiated",
      message: `Deploy of ${service} (${branch}) started`,
    };
  }
}
