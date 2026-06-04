import { join } from 'path';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Module } from '@nestjs/common';
import { PulsarModule } from '@jobber/pulsar';
import { FibonacciJob } from './fibonacci.job';
import { DiscoveryModule } from '@nestjs/core';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
// TODO: Fix the import path to avoid the module boundaries issue
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AUTH_PACKAGE_NAME } from 'types/proto/auth';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto', 'auth.proto'),
        },
      },
    ]),
  ],
  providers: [FibonacciJob, JobsResolver, JobsService],
})
export class JobsModule {}
