import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { envSchema } from './env'
import { AuthModule } from './auth/auth.module'

import { HttpModule } from './http/http.module'

@Module({
  // importar os modules adicionais
  imports: [
    // COnfigModule importa o .env e deixa ele global na aplicação
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
    HttpModule,
  ],
})
export class AppModule {}
