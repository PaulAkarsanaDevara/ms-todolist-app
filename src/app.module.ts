import { Module } from '@nestjs/common';
import { TodoService } from './todo/todo.service';
@Module({
  providers: [TodoService],
})
export class AppModule {}
