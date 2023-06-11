import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Todo } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateTodoDto,
  SearchTodoDto,
  QueryDto,
  PaginatedResult,
} from './dto/todo.dto';

@Injectable()
export class TodoService {
  constructor(private readonly prisma: PrismaService) {}

  // create Todo
  async createTodo(createTodoDto: CreateTodoDto): Promise<Todo | null> {
    return this.prisma.todo.create({ data: createTodoDto });
  }

  // get all todos
  async getAllTodos(query: QueryDto): Promise<PaginatedResult> {
    const page = Number(query?.page) || 1;
    const perPage = Number(query?.perPage) || 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;

    const [total, todos] = await Promise.all([
      this.prisma.todo.count(),
      this.prisma.todo.findMany({ take: perPage, skip }),
    ]);

    return { todos, meta: { total, currentPage: page, perPage } };
  }

  // get a todo
  async getTodo(id: string): Promise<Todo | null> {
    const todo = await this.prisma.todo.findUnique({
      where: { id: Number(id) },
    });

    if (!todo) {
      throw new HttpException(
        { success: false, message: 'Todo does not exist' },
        HttpStatus.NOT_FOUND,
      );
    }

    return todo;
  }

  // search todo by title/description
  async searchTodo(searchTodoDto: SearchTodoDto): Promise<PaginatedResult> {
    const page = Number(searchTodoDto?.page) || 1;
    const perPage = Number(searchTodoDto?.perPage) || 10;
    const skip = page > 0 ? perPage * (page - 1) : 0;
    const whereFilter = {
      OR: [
        { title: { search: searchTodoDto.title } },
        { description: { search: searchTodoDto.description } },
      ],
    };

    const [total, todos] = await Promise.all([
      this.prisma.todo.count({ where: whereFilter }),
      this.prisma.todo.findMany({ where: whereFilter, take: perPage, skip }),
    ]);

    return { todos, meta: { total, currentPage: page, perPage } };
  }
}
