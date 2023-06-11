import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsDefined({ message: 'username is required' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDefined({ message: 'password is required' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignInDto {
  @IsDefined({ message: 'username is required' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsDefined({ message: 'password is required' })
  @IsString()
  @IsNotEmpty()
  pass: string;
}

export class headersDto {
  @IsString()
  @IsNotEmpty()
  accessToken: string;
}
