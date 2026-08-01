import { Producer } from 'pulsar-client';
import { PulsarClient, serialize } from '@jobber/pulsar';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T, jobName: string): Promise<void> {
    await this.validateData(data);
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(jobName);
    }
    await this.producer.send({ data: serialize(data) });
  }

  private async validateData(data: T): Promise<void> {
    const instance = plainToInstance(this.messageClass, data);
    const errors = await validate(instance);

    if (errors.length && errors.length > 0) {
      throw new Error(`Job data is invalid: ${JSON.stringify(errors)}`);
    }
  }
}
