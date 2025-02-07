import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFilterPetsUseCase } from '@/use-cases/factories/make-filter-pets-use-case'
import { Size, Independence, Type } from '@prisma/client'

interface FilterQuerySchema {
  Querystring: {
    city: string
    age?: number
    size?: Size
    energyLevel?: number
    independence?: Independence
    type?: Type
  }
}

export async function filter(
  request: FastifyRequest<FilterQuerySchema>,
  reply: FastifyReply,
) {
  const filterPetsQuerySchema = z.object({
    city: z.string(),
    age: z.coerce.number().optional(),
    size: z.nativeEnum(Size).optional(),
    energyLevel: z.coerce.number().min(1).max(5).optional(),
    independence: z.nativeEnum(Independence).optional(),
    type: z.nativeEnum(Type).optional(),
  })

  const {
    city,
    age,
    size,
    energyLevel,
    independence,
    type,
  } = filterPetsQuerySchema.parse(request.query)

  const filterPetsUseCase = makeFilterPetsUseCase()

  const { pets } = await filterPetsUseCase.execute({
    city,
    age,
    size,
    energyLevel,
    independence,
    type,
  })

  return reply.status(200).send({
    pets,
  })
} 