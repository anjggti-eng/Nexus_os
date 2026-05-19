import { Injectable, Logger } from "@nestjs/common";
import { NodeSSH } from "node-ssh";

@Injectable()
export class SshService {
  private logger = new Logger(SshService.name);

  async exec(host: string, command: string, port = 22) {
    const ssh = new NodeSSH();
    try {
      await ssh.connect({
        host,
        port,
        username: process.env.SSH_USER || "root",
        privateKey: process.env.SSH_PRIVATE_KEY,
      });
      const result = await ssh.execCommand(command);
      return {
        host,
        command,
        output: result.stdout,
        error: result.stderr,
        exitCode: result.code,
      };
    } catch (err: any) {
      this.logger.error(`SSH exec failed on ${host}: ${err.message}`);
      throw err;
    } finally {
      ssh.dispose();
    }
  }
}
