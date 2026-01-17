import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthResolver } from './presentation/auth.resolver';
import { AuthService } from './aplication/services/auth.service';
@Module({
  imports: [UserModule], 
  providers: [
    AuthResolver, AuthService
  ],
  exports: [], 
})
export class AuthModule {}
