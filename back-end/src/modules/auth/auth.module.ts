import { Module } from '@nestjs/common';
import { AuthResolver } from './presentation/auth.resolver';
import { AuthService } from './aplication/services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './aplication/jwt.strategy';
import { UserModule } from '../user/user.module';
import { JwtAuthGuard } from './aplication/jwt-auth.guard';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret_key',
      signOptions: { expiresIn: '4h' },
    }),
    UserModule,

  ],
  providers: [
    AuthResolver, AuthService, JwtStrategy, JwtAuthGuard
  ],
  exports: [],
})
export class AuthModule { }
