import '@fastify/jwt'

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: {
      sub: string
      role: 'user' | 'organization'
    }
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user: {
      sub: string
      role: 'user' | 'organization'
    }
  }
} 