import { FastifyInstance } from 'fastify'

import { register } from './register'
import { getPetDetails } from './get-details'
import { registerPetSchema, getPetDetailsSchema } from './schemas'
import { verifyJwt } from '@/http/middlewares/verify-jwt'

export async function petsRoutes(app: FastifyInstance) {
  app.addHook('onRequest', verifyJwt)
  
  app.post('/pets', {
    schema: registerPetSchema,
    handler: register,
  })

  app.get('/pets/:id', {
    schema: getPetDetailsSchema,
    handler: getPetDetails,
  })
} 