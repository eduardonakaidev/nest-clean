import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'

@Module({
  imports: [],
  // registrando os controllers da aplicação
  controllers: [CreateAccountController],
  // registrando os services e providers da aplicação
  providers: [PrismaService],
})
export class AppModule {}
