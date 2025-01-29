import { z } from 'zod'
import { FastifySchema } from 'fastify'

export const registerBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  whatsapp: z.string().min(10),
  address: z.string().min(5),
})

export const registerResponseSchema = z.object({
  message: z.string().optional(),
})

export type RegisterBodySchema = z.infer<typeof registerBodySchema>

export const registerSchema: FastifySchema = {
  tags: ['Organizations'],
  description: 'Register a new organization',
  body: {
    type: 'object',
    required: ['name', 'email', 'password', 'whatsapp', 'address'],
    properties: {
      name: { type: 'string', minLength: 2 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      whatsapp: { type: 'string', minLength: 10 },
      address: { type: 'string', minLength: 5 },
    },
  },
  response: {
    201: {
      description: 'Organization successfully created',
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
    409: {
      description: 'Organization already exists',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
} 