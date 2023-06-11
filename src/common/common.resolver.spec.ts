import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonResolver } from './common.resolver';
import { CommonService } from './common.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { prismaMock } from '../singleton';
import { JwtService } from '@nestjs/jwt';

describe('CommonResolver', () => {
  let resolver: CommonResolver;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonResolver,
        PrismaService,
        CommonService,
        AuthService,
        JwtService,
        UsersService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    resolver = module.get<CommonResolver>(CommonResolver);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should login user', async () => {
    const user = { id: 1, username: 'neddy', password: '12345' };
    const accessToken = 'abcioef982-yfgqcavcuevbcqc';

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    prismaMock.users.findUnique.mockResolvedValue(user);
    jest
      .spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve(accessToken));

    await expect(
      resolver.signIn({ username: 'neddy', pass: '12345' }),
    ).resolves.toEqual({ accessToken });
  });
});
