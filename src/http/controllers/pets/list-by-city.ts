import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeListPetsByCityUseCase } from '@/use-cases/factories/make-list-pets-by-city-use-case'

export async function listPetsByCity(request: FastifyRequest, reply: FastifyReply) {
  const listPetsByCityQuerySchema = z.object({
    city: z.string(),
  })

  const { city } = listPetsByCityQuerySchema.parse(request.query)

  const listPetsByCityUseCase = makeListPetsByCityUseCase()

  const { pets } = await listPetsByCityUseCase.execute({
    city,
  })

  return reply.status(200).send({
    pets,
  })
} 