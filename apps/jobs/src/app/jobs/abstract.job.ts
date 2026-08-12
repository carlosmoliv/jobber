import { Producer } from 'pulsar-client';
import { PulsarClient, serialize } from '@jobber/pulsar';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { BadRequestException } from '@nestjs/common';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, jobName: string): Promise<void> {
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }
    if (Array.isArray(data)) {
      for (const message of data) {
        await this.sendMessage(message);
      }
      return;
    }
    await this.sendMessage(data);
  }

  private async sendMessage(data: T): Promise<void> {
    await this.validateData(data);
    await this.producer.send({ data: serialize(data) });
  }

  private async validateData(data: T): Promise<void> {
    const errors = await validate(plainToInstance(this.messageClass, data));

    if (errors.length) {
      throw new BadRequestException(
        `Job data is invalid: ${JSON.stringify(errors)}`,
      );
    }
  }
}
