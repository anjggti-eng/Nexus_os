import amqplib, { Channel, Connection } from "amqplib";

export class RabbitMQClient {
  private connection: Connection | null = null;
  private channel: Channel | null = null;
  private url: string;
  private reconnectAttempts = 0;
  private maxReconnect = 10;
  private reconnectDelay = 5000;

  constructor(url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    try {
      this.connection = await amqplib.connect(this.url);
      this.channel = await this.connection.createChannel();
      this.reconnectAttempts = 0;

      this.connection.on("close", () => {
        console.warn("[RabbitMQ] Connection closed, reconnecting...");
        this.reconnect();
      });

      this.connection.on("error", (err) => {
        console.error("[RabbitMQ] Connection error:", err.message);
      });

      console.log("[RabbitMQ] Connected");
    } catch (err) {
      console.error("[RabbitMQ] Connection failed:", err);
      this.reconnect();
    }
  }

  private reconnect(): void {
    if (this.reconnectAttempts >= this.maxReconnect) {
      console.error("[RabbitMQ] Max reconnect attempts reached");
      return;
    }
    this.reconnectAttempts++;
    setTimeout(() => this.connect(), this.reconnectDelay);
  }

  async assertExchange(
    name: string,
    type: "direct" | "topic" | "fanout" = "topic",
    durable = true
  ): Promise<void> {
    if (!this.channel) throw new Error("Channel not initialized");
    await this.channel.assertExchange(name, type, { durable });
  }

  async assertQueue(
    name: string,
    durable = true
  ): Promise<amqplib.Replies.AssertQueue> {
    if (!this.channel) throw new Error("Channel not initialized");
    return this.channel.assertQueue(name, { durable });
  }

  async bindQueue(
    queue: string,
    exchange: string,
    routingKey: string
  ): Promise<void> {
    if (!this.channel) throw new Error("Channel not initialized");
    await this.channel.bindQueue(queue, exchange, routingKey);
  }

  async publish(
    exchange: string,
    routingKey: string,
    message: unknown
  ): Promise<void> {
    if (!this.channel) throw new Error("Channel not initialized");
    const buffer = Buffer.from(JSON.stringify(message));
    this.channel.publish(exchange, routingKey, buffer, {
      persistent: true,
      contentType: "application/json",
    });
  }

  async consume(
    queue: string,
    handler: (message: amqplib.ConsumeMessage | null) => void
  ): Promise<void> {
    if (!this.channel) throw new Error("Channel not initialized");
    await this.channel.consume(queue, handler, { noAck: false });
  }

  async ack(message: amqplib.ConsumeMessage): Promise<void> {
    if (!this.channel) return;
    this.channel.ack(message);
  }

  async nack(message: amqplib.ConsumeMessage): Promise<void> {
    if (!this.channel) return;
    this.channel.nack(message, false, true);
  }

  async close(): Promise<void> {
    try {
      await this.channel?.close();
      await this.connection?.close();
    } catch {
      // ignore close errors
    }
  }
}
