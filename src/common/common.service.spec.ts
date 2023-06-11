import * as bcrypt from 'bcrypt';
import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { PrismaService } from '../prisma/prisma.service';
import { prismaMock } from '../singleton';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

describe('CommonService', () => {
  let commonService: CommonService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonService,
        AuthService,
        UsersService,
        PrismaService,
        JwtService,
      ],
    })
      .overrideProvider(PrismaService)
      .useValue(prismaMock)
      .compile();

    commonService = module.get<CommonService>(CommonService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(commonService).toBeDefined();
  });

  it('should validate user', async () => {
    const user = { id: 1, username: 'neddy', password: '12345' };

    jest.spyOn(bcrypt, 'compare').mockImplementation(() => true);
    prismaMock.users.findUnique.mockResolvedValue(user);

    await expect(
      commonService.validateUser({ username: 'neddy', pass: '12345' }),
    ).resolves.toEqual({ id: 1, username: 'neddy' });
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
      commonService.loginUser({ username: 'neddy', pass: '12345' }),
    ).resolves.toEqual({ accessToken });
  });
});
