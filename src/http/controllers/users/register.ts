import { FastifyRequest, FastifyReply } from 'fastify'
import { makeRegisterUserUseCase } from '@/use-cases/factories/make-register-user-use-case'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { InvalidBirthDateError } from '@/use-cases/errors/invalid-birth-date-error'
import { registerBodySchema, RegisterBodySchema } from './schemas'

export interface RegisterRequest {
  Body: RegisterBodySchema
}

export async function register(
  request: FastifyRequest<RegisterRequest>,
  reply: FastifyReply,
) {
  try {
    const { name, email, password, whatsapp, birth_date } = registerBodySchema.parse(
      request.body,
    )

    const registerUseCase = makeRegisterUserUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      whatsapp,
      birth_date,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof InvalidBirthDateError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }
} 