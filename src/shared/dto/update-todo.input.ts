import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
import { CreateTodoInput } from './create-todo.input';

@InputType()
export class UpdateTodoInput extends PartialType(CreateTodoInput) {
  @Field(() => ID)
  id: string;

  @Field({ nullable: true })
  isCompleted?: boolean;
}
