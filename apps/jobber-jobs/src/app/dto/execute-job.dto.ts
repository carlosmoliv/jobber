import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ExecuteJObInput {
  @Field()
  @IsNotEmpty()
  name: string;
}
