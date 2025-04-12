/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Inject } from '@nestjs/common';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateTodoInput } from 'src/shared/dto/create-todo.input';
import { UpdateTodoInput } from 'src/shared/dto/update-todo.input';
import { Todo } from 'src/shared/entities/todo.entity';

@Resolver(() => Todo)
export class TodoResolver {
  constructor(@Inject('TODO_SERVICE') private client: ClientProxy) {}

  @Query(() => [Todo])
  async todos() {
    return firstValueFrom(this.client.send('get_todos', {}));
  }

  @Mutation(() => Todo)
  async createTodo(@Args('createTodoInput') input: CreateTodoInput) {
    return firstValueFrom(this.client.send('create_todo', input));
  }

  @Mutation(() => Todo)
  async updateTodo(@Args('updateTodoInput') input: UpdateTodoInput) {
    return firstValueFrom(this.client.send('update_todo', input));
  }

  @Mutation(() => Boolean)
  async removeTodo(@Args('id') id: string) {
    return firstValueFrom(this.client.send('remove_todo', id));
  }
}
