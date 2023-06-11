import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Users } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  // create user
  async createUser(createUserDto: CreateUserDto): Promise<Users | null> {
    const saltOrRounds = 10;
    const salt = await bcrypt.genSalt(saltOrRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    return this.prisma.users.create({
      data: { username: createUserDto.username, password: hash },
    });
  }

  // get a user
  async getUser(username: string): Promise<Users | null> {
    return this.prisma.users.findUnique({ where: { username } });
  }
}
