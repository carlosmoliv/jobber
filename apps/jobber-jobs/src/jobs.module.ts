import { Module } from '@nestjs/common';
import { FibonacciJob } from './app/jobs/fibonacci.job';
import { DiscoveryModule } from '@nestjs/core';

@Module({
  imports: [DiscoveryModule],
  providers: [FibonacciJob],
})
export class JobsModule {}
