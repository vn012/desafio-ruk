import { Module } from '@nestjs/common'
import { UserService } from './aplication/services/user.service'
import { UserRepository } from './infra/prisma/user.repository'
import { UserResolver } from './presentation/user.resolver'
import { PrismaModule } from 'src/prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserRepository, UserResolver],
  exports: [UserService, UserRepository],
})
export class UserModule {}
