import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { registerSchema, authenticateSchema } from './schemas'

export async function organizationsRoutes(app: FastifyInstance) {
  app.post('/organizations', {
    schema: registerSchema,
    handler: register,
  })

  app.post('/organizations/authenticate', {
    schema: authenticateSchema,
    handler: authenticate,
  })
} 