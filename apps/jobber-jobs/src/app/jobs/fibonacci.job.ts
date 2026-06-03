import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'Generates a Fibonacci sequence and store in the DB.',
})
export class FibonacciJob extends AbstractJob {}
