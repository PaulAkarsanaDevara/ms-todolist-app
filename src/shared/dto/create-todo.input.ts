/* eslint-disable @typescript-eslint/no-unsafe-call */
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTodoInput {
  @Field()
  title: string;
}
