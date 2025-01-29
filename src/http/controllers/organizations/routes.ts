import { FastifyInstance } from 'fastify'
import { register } from './register'
import { registerSchema } from './schemas'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', {
    schema: registerSchema,
    handler: register,
  })
} 