import { Test, TestingModule } from '@nestjs/testing';
import { TodoService } from './todo.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';

describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    todoService = module.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  it('should create a new todo', async () => {
    const todoPayload = {
      id: 1,
      title: 'NestJS',
      description: 'An opinionated framework',
      completed: false,
    };

    prismaMock.todo.create.mockResolvedValue(todoPayload);

    await expect(todoService.createTodo(todoPayload)).resolves.toEqual({
      id: 1,
      title: 'NestJS',
      description: 'An opinionated framework',
      completed: false,
    });
  });

  it('should get all todos', async () => {
    const todoPayload = [
      {
        id: 1,
        title: 'NestJS',
        description: 'An opinionated framework',
        completed: false,
      },
    ];

    prismaMock.todo.count.mockResolvedValue(1);
    prismaMock.todo.findMany.mockResolvedValue(todoPayload);

    await expect(todoService.getAllTodos({})).resolves.toEqual({
      meta: {
        currentPage: 1,
        perPage: 10,
        total: 1,
      },
      todos: todoPayload,
    });
  });

  it('should get todo by id', async () => {
    const todoId = '1';
    const todo = {
      id: 1,
      title: 'NestJS',
      description: 'An opinionated framework',
      completed: false,
    };

    prismaMock.todo.findUnique.mockResolvedValue(todo);

    await expect(todoService.getTodo(todoId)).resolves.toEqual(todo);
  });

  it('should get search todo by title', async () => {
    const title = '1';
    const todo = [
      {
        id: 1,
        title: 'NestJS',
        description: 'An opinionated framework',
        completed: false,
      },
    ];

    prismaMock.todo.count.mockResolvedValue(1);
    prismaMock.todo.findMany.mockResolvedValue(todo);

    await expect(todoService.searchTodo({ title })).resolves.toEqual({
      meta: {
        currentPage: 1,
        perPage: 10,
        total: 1,
      },
      todos: todo,
    });
  });

  it('should get search todo by description', async () => {
    const description = 'opinionated';
    const todo = [
      {
        id: 1,
        title: 'NestJS',
        description: 'An opinionated framework',
        completed: false,
      },
    ];

    prismaMock.todo.count.mockResolvedValue(1);
    prismaMock.todo.findMany.mockResolvedValue(todo);

    await expect(todoService.searchTodo({ description })).resolves.toEqual({
      meta: {
        currentPage: 1,
        perPage: 10,
        total: 1,
      },
      todos: todo,
    });
  });
});
