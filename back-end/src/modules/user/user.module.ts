import { Module } from '@nestjs/common';
import { UserService } from './aplication/services/user.service';
import { UserRepository } from './infra/prisma/user.repository';
import { UserResolver } from './presentation/user.resolver';

@Module({
  providers: [
    UserService,      // Application
    UserRepository,   // Infra 
    UserResolver      // Presentation 
  ],
  exports: [UserService], 
})
export class UserModule {}
