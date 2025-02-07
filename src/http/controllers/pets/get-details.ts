import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeGetPetDetailsUseCase } from '@/use-cases/factories/make-get-pet-details-use-case'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

interface GetDetailsRequest {
  Params: {
    id: string
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      sub: string
      role: 'user' | 'organization'
    }
  }
}

export async function getPetDetails(
  request: FastifyRequest<GetDetailsRequest>,
  reply: FastifyReply,
) {
  const getPetDetailsParamsSchema = z.object({
    id: z.string().uuid(),
  })

  const { id } = getPetDetailsParamsSchema.parse(request.params)

  if (request.user.role !== 'user') {
    return reply.status(403).send({ message: 'Only users can view pet details.' })
  }

  try {
    const getPetDetailsUseCase = makeGetPetDetailsUseCase()

    const { pet } = await getPetDetailsUseCase.execute({
      petId: id,
    })

    return reply.status(200).send({
      pet,
    })
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