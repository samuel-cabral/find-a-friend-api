import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterOrganizationUseCase } from '@/use-cases/factories/make-register-organization-use-case'
import { OrganizationAlreadyExistsError } from '@/use-cases/errors/organization-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    whatsapp: z.string(),
    address: z.string(),
  })

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
      return reply.status(400).send({ message: 'Validation error.', issues: err.format() })
    }

    throw err
  }
} 