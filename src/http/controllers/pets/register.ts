import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { registerPetBodySchema, RegisterPetBodySchema } from './schemas'

export async function register(
  request: FastifyRequest<{ Body: RegisterPetBodySchema }>,
  reply: FastifyReply,
) {
  try {
    const { sub: organization_id } = request.user

    const {
      name,
      description,
      age,
      size,
      energy_level,
      independence,
      type,
    } = registerPetBodySchema.parse(request.body)

    const registerPetUseCase = makeRegisterPetUseCase()

    await registerPetUseCase.execute({
      name,
      description,
      age,
      size,
      energy_level,
      independence,
      type,
      organization_id,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }

    if (err instanceof z.ZodError) {
      return reply.status(400).send({
        message: 'Validation error.',
        issues: err.format(),
      })
    }

    throw err
  }
} 