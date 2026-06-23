import { PulsarClient } from '@jobber/pulsar';
import { AbstractJob } from '../abstract.job';
import { Job } from '../../decorators/job.decorator';
import { FibonacciData } from './fibonacci-data.interface';

@Job({
  name: 'Fibonacci',
  description: 'Generates a Fibonacci sequence and store in the DB.',
})
export class FibonacciJob extends AbstractJob<FibonacciData> {
  constructor(pulsarClient: PulsarClient) {
    super(pulsarClient);
  }
}
