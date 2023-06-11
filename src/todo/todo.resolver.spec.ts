import { Test, TestingModule } from '@nestjs/testing';
import { TodoResolver } from './todo.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { TodoService } from './todo.service';

describe('TodoResolver', () => {
  let resolver: TodoResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoResolver, PrismaService, TodoService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    resolver = module.get<TodoResolver>(TodoResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new todo', async () => {
    const todoPayload = {
      id: 1,
      title: 'NestJS',
      description: 'An opinionated framework',
      completed: false,
    };

    prismaMock.todo.create.mockResolvedValue(todoPayload);

    await expect(resolver.createTodo(todoPayload)).resolves.toEqual({
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

    await expect(resolver.getAllTodos({})).resolves.toEqual({
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

    await expect(resolver.getTodo(todoId)).resolves.toEqual(todo);
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

    await expect(resolver.searchTodo({ title })).resolves.toEqual({
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

    await expect(resolver.searchTodo({ description })).resolves.toEqual({
      meta: {
        currentPage: 1,
        perPage: 10,
        total: 1,
      },
      todos: todo,
    });
  });
});
