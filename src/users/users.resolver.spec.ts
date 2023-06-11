import { Test, TestingModule } from '@nestjs/testing';
import { UsersResolver } from './users.resolver';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { UsersService } from './users.service';

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersResolver, PrismaService, UsersService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUser = {
      id: 1,
      username: 'neddy',
      password: '12345',
    };

    prismaMock.users.create.mockResolvedValue(newUser);

    await expect(
      resolver.createUser({ username: 'neddy', password: '12345' }),
    ).resolves.toEqual(newUser);
  });
});
