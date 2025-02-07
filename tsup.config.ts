import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['cjs'],
  sourcemap: true,
  clean: true,
  tsconfig: 'tsconfig.json',
  noExternal: ['@fastify/jwt'],
  exclude: ['**/*.spec.ts', '**/*.test.ts'],
}) 