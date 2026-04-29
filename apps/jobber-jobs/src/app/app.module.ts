import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JobsModule } from '../jobs.module';
import { JobsService } from './jobs/jobs.service';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';

@Module({
  imports: [ConfigModule, JobsModule, DiscoveryModule],
  controllers: [],
  providers: [JobsService],
})
export class AppModule {}
