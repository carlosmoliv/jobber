import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Job } from '../models/job.model';
import { JobsService } from './jobs.service';
import { ExecuteJobInput } from '../dto/execute-job.dto';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '@jobber/nestjs';

@Resolver()
export class JobsResolver {
  constructor(private readonly jobsService: JobsService) {}

  @Query(() => [Job], { name: 'jobs' })
  @UseGuards(GqlAuthGuard)
  async getJobs() {
    return this.jobsService.getJobs();
  }

  @Mutation(() => Job)
  @UseGuards(GqlAuthGuard)
  async executeJob(@Args('executeJobInput') input: ExecuteJobInput) {
    return this.jobsService.executeJob(input.name, input.data);
  }
}
