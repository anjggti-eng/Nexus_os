import { Module } from "@nestjs/common";
import { DockerModule } from "./modules/docker/docker.module";
import { SshModule } from "./modules/ssh/ssh.module";

@Module({
  imports: [DockerModule, SshModule],
})
export class InfraServiceModule {}
