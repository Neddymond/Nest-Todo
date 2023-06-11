import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';

describe('UsersService', () => {
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should create a new user', async () => {
    const newUser = {
      id: 1,
      username: 'neddy',
      password: '12345',
    };

    prismaMock.users.create.mockResolvedValue(newUser);

    await expect(
      userService.createUser({ username: 'neddy', password: '12345' }),
    ).resolves.toEqual(newUser);
  });

  it('should get user by username', async () => {
    const newUser = {
      id: 1,
      username: 'neddy',
      password: '12345',
    };

    prismaMock.users.findUnique.mockResolvedValue(newUser);

    await expect(userService.getUser('neddy')).resolves.toEqual(newUser);
  });
});
