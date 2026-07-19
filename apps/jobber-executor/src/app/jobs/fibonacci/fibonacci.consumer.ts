import { Injectable, OnModuleInit } from '@nestjs/common';
import { PulsarClient, PulsarConsumer } from '@jobber/pulsar';
import { Message } from 'pulsar-client';

const FIBONACCI_TOPIC = 'Fibonacci';

@Injectable()
export class FibonacciConsumer extends PulsarConsumer implements OnModuleInit {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient, FIBONACCI_TOPIC);
  }

  protected async onMessage(message: Message): Promise<void> {
    console.log(`Received message: ${message.getData().toString()}`);
    await this.acknowledge(message);
  }
}
