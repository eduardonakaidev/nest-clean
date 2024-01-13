import {
  ConflictException,
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
} from '@nestjs/common'
import { hash } from 'bcryptjs'
import { z } from 'zod'
import { PrismaService } from '@/infra/prisma/prisma.service'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation-pipe'

// definindo schema do body da requisição
const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
})

// tranferindo o schema para um typeof
type CreateAccountBodySchema = z.infer<typeof createAccountBodySchema>

// declaração que é um controller
@Controller('/accounts')
export class CreateAccountController {
  constructor(private prisma: PrismaService) {}
  // definindo rota post
  @Post()

  // definindo o retorno positivo caso seja concluido
  @HttpCode(201)

  // adicionando validação no body
  @UsePipes(new ZodValidationPipe(createAccountBodySchema))
  async handle(@Body() body: CreateAccountBodySchema) {
    // declaração do body
    const { name, email, password } = body

    // verificando se o email já existe no banco de dados
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    })
    if (userWithSameEmail) {
      throw new ConflictException(
        'User with same e-mail address already exists.',
      )
    }

    // hash da senha enviada
    const hashedPassword = await hash(password, 8)

    // criando no banco
    await this.prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })
  }
}
