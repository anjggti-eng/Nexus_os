import { Controller, Post, Body } from "@nestjs/common";
import { SshService } from "./ssh.service";

@Controller("ssh")
export class SshController {
  constructor(private ssh: SshService) {}

  @Post("exec")
  async exec(@Body() body: { host: string; command: string; port?: number }) {
    return this.ssh.exec(body.host, body.command, body.port);
  }
}
