import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/users.dto';

@Resolver()
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

  @Mutation('createUser')
  async createUser(@Args('input') args: CreateUserDto) {
    return this.userService.createUser(args);
  }
}
