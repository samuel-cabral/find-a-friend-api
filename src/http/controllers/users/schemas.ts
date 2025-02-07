import { z } from 'zod'
import { FastifySchema } from 'fastify'

export const registerBodySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  whatsapp: z.string().min(10),
  birth_date: z.coerce.date(),
})

export type RegisterBodySchema = z.infer<typeof registerBodySchema>

export const registerSchema: FastifySchema = {
  tags: ['Users'],
  description: 'Register a new user',
  body: {
    type: 'object',
    required: ['name', 'email', 'password', 'whatsapp', 'birth_date'],
    properties: {
      name: { type: 'string', minLength: 2 },
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      whatsapp: { type: 'string', minLength: 10 },
      birth_date: { type: 'string', format: 'date' },
    },
  },
  response: {
    201: {
      description: 'User successfully created',
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
      description: 'User already exists',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
}

export const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export type AuthenticateBodySchema = z.infer<typeof authenticateBodySchema>

export const authenticateSchema: FastifySchema = {
  tags: ['Users'],
  description: 'Authenticate as a user',
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
    },
  },
  response: {
    200: {
      description: 'Successfully authenticated',
      type: 'object',
      properties: {
        token: { type: 'string' },
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
    401: {
      description: 'Invalid credentials',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
  },
} 