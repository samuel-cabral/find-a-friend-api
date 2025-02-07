# Find a Friend API

## Description

This is the API for the Find a Friend application. This is an simple API to a pet adoption application.

## Technologies

- Node.js
- Fastify
- Prisma ORM
- TypeScript
- JWT
- Bcryptjs
- CORS
- Zod
- Fastify Swagger (for documentation)
- Vitest (for unit tests and e2e tests)
- Supertest (for e2e tests)
- Postgres (for database, image from bitnami)
- Docker (for containerization)
- Docker Compose (for containerization)
- Prettier (for code formatting)
- ESLint (for code linting)

## How to run the project

1. Clone the repository
2. Run `pnpm install` to install the dependencies
3. Run `pnpm dev` to start the development server

## How to run the tests

1. Run `pnpm test` to run the tests and to watch, you can also run `pnpm test:watch` to run the tests and to watch
2. Run `pnpm test:e2e` to run the e2e tests and to watch, you can also run `pnpm test:e2e:watch` to run the e2e tests and to watch

## Functional Requirements

- [x] It should be able to register a new pet.
- [ ] It should be able to list all available pets to adoption in a city.
- [ ] It should be able to filter all pets by caracteristics.
- [ ] It should be able to get details of a pet to adoption.
- [x] It should be able to register as a new organization.
- [x] It should be able to sign in as an organization.

## Business Rules

- [ ] To listing pets, informing the city name is mandatory.
- [ ] An organization must have an address and a whatsapp number.
- [ ] A pet must be linked to an organization.
- [ ] The user who wants to adopt will be in touch with the organization by whatsapp.
- [ ] All the filters, beyong the city name, are optional.
- [ ] If an organization wants to access the application as admin, they must be signed in.
- [ ] The user who wants to adopt a pet must be signed in.
- [ ] The user who wants to adopt a pet must be at least 18 years old.
- [ ] The user who wants to adopt a pet must have a whatsapp number.
