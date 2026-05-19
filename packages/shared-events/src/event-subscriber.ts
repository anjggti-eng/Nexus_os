import { EventPayload } from "@nexusos/shared-types";
import { RabbitMQClient } from "./rabbitmq-client";

export class EventSubscriber {
  constructor(private rabbitmq: RabbitMQClient) {}

  async subscribe(
    pattern: string,
    handler: (payload: EventPayload) => Promise<void>,
    queueName?: string
  ): Promise<void> {
    const queue = queueName || `nexusos.queue.${pattern.replace(/\./g, "-")}`;

    await this.rabbitmq.assertQueue(queue);
    await this.rabbitmq.bindQueue(queue, "nexusos.events", pattern);

    await this.rabbitmq.consume(queue, async (msg) => {
      if (!msg) return;

      try {
        const payload: EventPayload = JSON.parse(msg.content.toString());
        await handler(payload);
        await this.rabbitmq.ack(msg);
      } catch (err) {
        console.error(`[EventSubscriber] Error handling ${pattern}:`, err);
        await this.rabbitmq.nack(msg);
      }
    });
  }
}
