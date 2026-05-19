import { randomUUID as uuid } from "crypto";
import { NexusEvent, EventPayload } from "@nexusos/shared-types";
import { RabbitMQClient } from "./rabbitmq-client";

export class EventPublisher {
  constructor(private rabbitmq: RabbitMQClient) {}

  async publish(
    event: NexusEvent,
    payload: Omit<EventPayload, "event">
  ): Promise<void> {
    const message: EventPayload = {
      event,
      ...payload,
      correlationId: payload.correlationId || uuid(),
    };

    await this.rabbitmq.publish("nexusos.events", event, message);
  }
}
