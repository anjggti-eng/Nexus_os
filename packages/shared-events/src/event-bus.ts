import { NexusEvent, EventPayload } from "@nexusos/shared-types";
import { RabbitMQClient } from "./rabbitmq-client";
import { EventPublisher } from "./event-publisher";
import { EventSubscriber } from "./event-subscriber";

export class EventBus {
  private publisher: EventPublisher;
  private subscriber: EventSubscriber;
  private rabbitmq: RabbitMQClient;

  constructor(rabbitmqUrl: string) {
    this.rabbitmq = new RabbitMQClient(rabbitmqUrl);
    this.publisher = new EventPublisher(this.rabbitmq);
    this.subscriber = new EventSubscriber(this.rabbitmq);
  }

  async connect(): Promise<void> {
    await this.rabbitmq.connect();
    await this.rabbitmq.assertExchange("nexusos.events", "topic");
    await this.rabbitmq.assertExchange("nexusos.commands", "direct");
    await this.rabbitmq.assertExchange("nexusos.workflows", "topic");
  }

  async publish(event: NexusEvent, payload: Omit<EventPayload, "event">): Promise<void> {
    await this.publisher.publish(event, payload);
  }

  async subscribe(
    pattern: string,
    handler: (payload: EventPayload) => Promise<void>,
    queueName?: string
  ): Promise<void> {
    await this.subscriber.subscribe(pattern, handler, queueName);
  }

  async close(): Promise<void> {
    await this.rabbitmq.close();
  }

  getClient(): RabbitMQClient {
    return this.rabbitmq;
  }
}
