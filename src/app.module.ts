import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaService } from './prisma/prisma.service'
import { CreateAccountController } from './controllers/create-account.controller'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'
import { AuthenticateController } from './controllers/authenticate-controller'

@Module({
  // importar os modules adicionais
  imports: [
    // COnfigModule importa o .env e deixa ele global na aplicação
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  // registrando os controllers da aplicação
  controllers: [CreateAccountController, AuthenticateController],
  // registrando os services e providers da aplicação
  providers: [PrismaService],
})
export class AppModule {}
