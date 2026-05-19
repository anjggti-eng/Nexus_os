import { Injectable, NotFoundException } from "@nestjs/common";
import {
  makeWASocket,
  DisconnectReason,
  useMultiFileAuthState,
  WASocket,
} from "@whiskeysockets/baileys";
import { RedisService } from "../../redis.service";
import { SessionGateway } from "./session.gateway";
import * as path from "path";
import * as fs from "fs";

interface SessionData {
  id: string;
  name: string;
  number?: string;
  status: string;
  qrCode?: string;
}

@Injectable()
export class SessionService {
  private sessions: Map<string, { socket: WASocket; data: SessionData }> = new Map();
  private sessionsDir = process.env.WHATSAPP_SESSION_PATH || "./sessions";

  constructor(
    private redis: RedisService,
    private gateway: SessionGateway
  ) {
    if (!fs.existsSync(this.sessionsDir)) {
      fs.mkdirSync(this.sessionsDir, { recursive: true });
    }
  }

  async list(): Promise<SessionData[]> {
    return Array.from(this.sessions.values()).map((s) => s.data);
  }

  async create(name: string, webhookUrl?: string): Promise<SessionData> {
    const id = `${name}_${Date.now()}`;
    const sessionDir = path.join(this.sessionsDir, id);
    fs.mkdirSync(sessionDir, { recursive: true });

    const { state, saveCreds } = await useMultiFileAuthState(sessionDir);

    const data: SessionData = { id, name, status: "CONNECTING" };
    this.sessions.set(id, { socket: null as any, data });

    const socket = makeWASocket({
      auth: state,
      printQRInTerminal: false,
      logger: { info: () => {}, error: () => {}, warn: () => {} } as any,
    });

    socket.ev.on("connection.update", async (update) => {
      const { connection, lastDisconnect, qr } = update;

      if (qr) {
        data.qrCode = qr;
        data.status = "SCANNING";
        this.gateway.emitQrCode(id, qr);
      }

      if (connection === "open") {
        data.status = "CONNECTED";
        data.number = socket.user?.id;
        data.qrCode = undefined;
        this.gateway.emitStatus(id, "CONNECTED");
        await this.redis.set(`session:${id}:status`, "CONNECTED");
      }

      if (connection === "close") {
        const shouldReconnect =
          (lastDisconnect?.error as any)?.output?.statusCode !== DisconnectReason.loggedOut;

        data.status = "DISCONNECTED";

        if (shouldReconnect) {
          setTimeout(() => this.reconnect(id), 5000);
        } else {
          fs.rmSync(sessionDir, { recursive: true, force: true });
          this.sessions.delete(id);
        }
      }
    });

    socket.ev.on("creds.update", saveCreds);

    socket.ev.on("messages.upsert", async (m) => {
      const message = m.messages[0];
      if (message.key && message.messageConversation) {
        this.gateway.emitMessage(id, {
          from: message.key.remoteJid,
          body: message.messageConversation,
          timestamp: message.messageTimestamp as number,
        });
      }
    });

    this.sessions.set(id, { socket, data });
    return data;
  }

  async get(id: string): Promise<SessionData> {
    const session = this.sessions.get(id);
    if (!session) throw new NotFoundException("Session not found");
    return session.data;
  }

  async delete(id: string): Promise<void> {
    const session = this.sessions.get(id);
    if (session) {
      session.socket?.logout();
      session.socket?.ws?.close();
      const sessionDir = path.join(this.sessionsDir, id);
      if (fs.existsSync(sessionDir)) {
        fs.rmSync(sessionDir, { recursive: true, force: true });
      }
      this.sessions.delete(id);
    }
  }

  async getQrCode(id: string): Promise<{ qrCode: string }> {
    const session = this.sessions.get(id);
    if (!session) throw new NotFoundException("Session not found");
    if (!session.data.qrCode) throw new NotFoundException("QR Code not available");
    return { qrCode: session.data.qrCode };
  }

  async sendMessage(sessionId: string, to: string, text: string) {
    const session = this.sessions.get(sessionId);
    if (!session) throw new NotFoundException("Session not found");
    const sent = await session.socket.sendMessage(to, { text });
    return sent;
  }

  private async reconnect(id: string) {
    const session = this.sessions.get(id);
    if (!session) return;
    const name = session.data.name;
    const webhookUrl = undefined;
    await this.delete(id);
    await this.create(name, webhookUrl);
  }
}
