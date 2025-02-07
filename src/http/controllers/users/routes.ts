import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { registerSchema, authenticateSchema } from './schemas'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/users', {
    schema: registerSchema,
    handler: register,
  })

  app.post('/users/authenticate', {
    schema: authenticateSchema,
    handler: authenticate,
  })
} 