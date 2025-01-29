import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'
import { registerBodySchema, RegisterBodySchema } from './schemas'

export async function register(
  request: FastifyRequest<{ Body: RegisterBodySchema }>,
  reply: FastifyReply,
) {
  try {
    const { name, email, password, whatsapp, address } = registerBodySchema.parse(
      request.body,
    )

    const registerUseCase = makeRegisterOrganizationUseCase()

    await registerUseCase.execute({
      name,
      email,
      password,
      whatsapp,
      address,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof OrganizationAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    if (err instanceof z.ZodError) {
      return reply.status(400).send({ 
        message: 'Validation error.',
        issues: err.format() 
      })
    }

    throw err
  }
} 