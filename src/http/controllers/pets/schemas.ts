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

export const getPetDetailsSchema: FastifySchema = {
  tags: ['Pets'],
  description: 'Get details of a specific pet',
  security: [{ bearerAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', format: 'uuid' },
    },
  },
  response: {
    200: {
      description: 'Successful response',
      type: 'object',
      properties: {
        pet: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            city: { type: 'string' },
            age: { type: 'integer' },
            size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'LARGE'] },
            energy_level: { type: 'integer' },
            independence: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] },
            type: { type: 'string', enum: ['DOG', 'CAT'] },
            organization_id: { type: 'string' },
            created_at: { type: 'string', format: 'date-time' },
            organization: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                email: { type: 'string' },
                whatsapp: { type: 'string' },
                address: { type: 'string' },
                created_at: { type: 'string', format: 'date-time' },
              },
            },
          },
        },
      },
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
    403: {
      description: 'Forbidden',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    404: {
      description: 'Pet not found',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

export const filterPetsSchema = {
  querystring: {
    type: 'object',
    properties: {
      city: { type: 'string' },
      age: { type: 'number', nullable: true },
      size: { type: 'string', enum: ['SMALL', 'MEDIUM', 'LARGE'], nullable: true },
      energyLevel: { type: 'number', minimum: 1, maximum: 5, nullable: true },
      independence: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'], nullable: true },
      type: { type: 'string', enum: ['DOG', 'CAT'], nullable: true },
    },
    required: ['city'],
  },
} 