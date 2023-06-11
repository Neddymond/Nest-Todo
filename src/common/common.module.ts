import { Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { CommonResolver } from './common.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [AuthModule, UsersModule],
  providers: [CommonService, CommonResolver],
})
export class CommonModule {}
