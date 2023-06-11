import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';

describe('AuthService', () => {
  let authService: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService, AuthService],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    authService = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  it('should generate access token', async () => {
    const user = { id: 1, username: 'neddy', password: '12345' };
    const accessToken = 'abcioef982-yfgqcavcuevbcqc';

    jest
      .spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve(accessToken));

    await expect(authService.generateAuthToken(user)).resolves.toEqual({
      accessToken,
    });
  });
});
