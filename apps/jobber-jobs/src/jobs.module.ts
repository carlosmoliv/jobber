import { Module } from '@nestjs/common';
import { FibonacciJob } from './app/jobs/fibonacci.job';

@Module({
  providers: [FibonacciJob],
})
export class JobsModule {}
