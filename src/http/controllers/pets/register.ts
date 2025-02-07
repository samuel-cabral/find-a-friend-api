import { FastifyReply, FastifyRequest } from 'fastify'
import { makeRegisterPetUseCase } from '@/use-cases/factories/make-register-pet-use-case'
import { registerPetBodySchema, type RegisterPetBodySchema } from './schemas'

export interface RegisterRequest {
  Body: RegisterPetBodySchema
}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      sub: string
    }
  }
}

export async function register(
  request: FastifyRequest<RegisterRequest>,
  reply: FastifyReply,
) {
  const { name, description, age, size, energy_level, independence, type } = registerPetBodySchema.parse(request.body)

  const registerPetUseCase = makeRegisterPetUseCase()

  await registerPetUseCase.execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence,
    type,
    organization_id: request.user.sub,
  })

  return reply.status(201).send()
} 