import { FastifyInstance } from 'fastify'
import { register } from './register'
import { registerPetSchema } from './schemas'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/pets', {
    schema: registerPetSchema,
    handler: register,
  })
} 