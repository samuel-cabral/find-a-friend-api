import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { register } from './register'
import { getPetDetails } from './get-details'
import { listPetsByCity } from './list-by-city'
import { registerPetSchema, getPetDetailsSchema } from './schemas'

export async function petsRoutes(app: FastifyInstance) {
  app.post('/pets', {
    schema: registerPetSchema,
    onRequest: [verifyJwt],
    handler: register,
  })

  app.get('/pets/:petId', {
    schema: getPetDetailsSchema,
    handler: getPetDetails,
  })

  app.get('/pets', listPetsByCity)
} 