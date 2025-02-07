import { z } from 'zod'
import { FastifySchema } from 'fastify'

export const registerPetBodySchema = z.object({
  name: z.string().min(2),
  description: z.string().min(10),
  age: z.number().int().positive(),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE']),
  energy_level: z.number().int().min(1).max(5),
  independence: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  type: z.enum(['DOG', 'CAT']),
})

export type RegisterPetBodySchema = z.infer<typeof registerPetBodySchema>

export const registerPetSchema: FastifySchema = {
  tags: ['Pets'],
  description: 'Register a new pet',
  security: [{ bearerAuth: [] }],
  body: {
    type: 'object',
    required: ['name', 'description', 'age', 'size', 'energy_level', 'independence', 'type'],
    properties: {
      name: { type: 'string', minLength: 2 },
      description: { type: 'string', minLength: 10 },
      age: { type: 'integer', minimum: 0 },
      size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'LARGE'] },
      energy_level: { type: 'integer', minimum: 1, maximum: 5 },
      independence: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
      type: { type: 'string', enum: ['DOG', 'CAT'] },
    },
  },
  response: {
    201: {
      description: 'Pet successfully created',
      type: 'null',
    },
    400: {
      description: 'Validation error',
      type: 'object',
      properties: {
        message: { type: 'string' },
        issues: {
          type: 'object',
          additionalProperties: true,
        },
      },
    },
    404: {
      description: 'Organization not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
} 