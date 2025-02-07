import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'

import { register, RegisterRequest } from './register'
import { listPetsByCity } from './list-by-city'
import { getPetDetails } from './get-details'
import { filter } from './filter'
import { registerPetSchema, getPetDetailsSchema, filterPetsSchema, type RegisterPetBodySchema } from './schemas'

export async function petsRoutes(app: FastifyInstance) {
  app.post<{ Body: RegisterPetBodySchema }>('/pets', { 
    onRequest: [verifyJwt],
    schema: registerPetSchema,
  }, register)
  app.get('/pets/city/:city', listPetsByCity)
  app.get('/pets/:id', { schema: getPetDetailsSchema }, getPetDetails)
  app.get('/pets', { schema: filterPetsSchema }, filter)
} 