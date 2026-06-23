import { Producer } from 'pulsar-client';
import { PulsarClient } from '@jobber/pulsar';
import { OnModuleDestroy } from '@nestjs/common';

export abstract class AbstractJob<T> implements OnModuleDestroy {
  private producer: Producer;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, jobName: string): Promise<void> {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }
    await this.producer.send({ data: Buffer.from(JSON.stringify(data)) });
  }

  async onModuleDestroy() {
    if (this.producer) {
      await this.producer.close();
    }
  }
}
