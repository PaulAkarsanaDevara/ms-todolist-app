import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTodoInput } from 'src/shared/dto/create-todo.input';
import { UpdateTodoInput } from 'src/shared/dto/update-todo.input';
import { Todo } from 'src/shared/entities/todo.entity';
import { v4 as uuidv4 } from 'uuid';

@Controller()
export class TodoService {
  private todos: Todo[] = [];

  @MessagePattern('get_todos')
  getTodos(): Todo[] {
    return this.todos;
  }

  @MessagePattern('create_todo')
  createTodo(data: CreateTodoInput): Todo {
    const todo: Todo = { id: uuidv4(), title: data.title, isCompleted: false };
    this.todos.push(todo);
    return todo;
  }

  @MessagePattern('update_todo')
  updateTodo(data: UpdateTodoInput) {
    const todo = this.todos.find((t) => t.id === data.id);
    if (!todo) return null;
    if (data.title) todo.title = data.title;
    if (data.isCompleted !== undefined) todo.isCompleted = data.isCompleted;
    return todo;
  }

  @MessagePattern('remove_todo')
  removeTodo(id: string): boolean {
    const index = this.todos.findIndex((t) => t.id === id);
    if (index === -1) return false;
    this.todos.splice(index, 1);
    return true;
  }
}
