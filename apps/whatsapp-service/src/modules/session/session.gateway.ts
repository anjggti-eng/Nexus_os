import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
  namespace: "/whatsapp",
})
export class SessionGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage("subscribe")
  handleSubscribe(client: Socket, sessionId: string) {
    client.join(`session:${sessionId}`);
  }

  emitQrCode(sessionId: string, qrCode: string) {
    this.server?.to(`session:${sessionId}`).emit("qr", { sessionId, qrCode });
  }

  emitStatus(sessionId: string, status: string) {
    this.server?.to(`session:${sessionId}`).emit("status", { sessionId, status });
  }

  emitMessage(sessionId: string, message: { from: string; body: string; timestamp: number }) {
    this.server?.to(`session:${sessionId}`).emit("message", { sessionId, ...message });
  }
}
