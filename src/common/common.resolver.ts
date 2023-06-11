import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { SignInDto } from '../users/dto/users.dto';
import { CommonService } from './common.service';

@Resolver()
export class CommonResolver {
  constructor(private readonly commonService: CommonService) {}

  @Mutation('login')
  async signIn(@Args('input') args: SignInDto) {
    return this.commonService.loginUser(args);
  }
}
