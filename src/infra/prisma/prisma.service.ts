import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

// criação do prisma service para ter acesso ao prismaclient
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleDestroy, OnModuleInit
{
  constructor() {
    super({
      log: ['error', 'warn'],
    })
  }

  onModuleDestroy() {
    return this.$disconnect()
  }

  onModuleInit() {
    return this.$connect()
  }
}
