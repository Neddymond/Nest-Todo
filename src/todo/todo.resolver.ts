import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { TodoService } from './todo.service';
import { JwtAuthGuard } from '../auth/auth.guard';
import { CreateTodoDto, QueryDto, SearchTodoDto } from './dto/todo.dto';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class TodoResolver {
  constructor(private readonly todoService: TodoService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation('createTodo')
  async createTodo(@Args('input') args: CreateTodoDto) {
    return this.todoService.createTodo(args);
  }

  @UseGuards(JwtAuthGuard)
  @Query('todos')
  async getAllTodos(@Args('input') args: QueryDto) {
    return this.todoService.getAllTodos(args);
  }

  @UseGuards(JwtAuthGuard)
  @Query('todo')
  async getTodo(@Args('id') args: string) {
    return this.todoService.getTodo(args);
  }

  @UseGuards(JwtAuthGuard)
  @Query('searchTodo')
  async searchTodo(@Args('input') args: SearchTodoDto) {
    return this.todoService.searchTodo(args);
  }
}
