import * as bcrypt from 'bcrypt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersService } from '../users/users.service';
import { SignInDto } from '../users/dto/users.dto';

@Injectable()
export class CommonService {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // validate user creds
  async validateUser(signInDto: SignInDto): Promise<any> {
    const user = await this.usersService.getUser(signInDto.username);
    if (!user) {
      throw new HttpException(
        { success: false, message: 'User does not exist' },
        HttpStatus.NOT_FOUND,
      );
    }

    const isMatch = await bcrypt.compare(signInDto.pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user;
    return rest;
  }

  // login a user
  async loginUser(signInDto: SignInDto): Promise<any> {
    return await this.authService.generateAuthToken(
      await this.validateUser(signInDto),
    );
  }
}
