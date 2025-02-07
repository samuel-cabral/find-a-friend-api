import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterPetUseCase } from './register-pet'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { hash } from 'bcryptjs'

let petsRepository: InMemoryPetsRepository
let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterPetUseCase(petsRepository, organizationsRepository)
  })

  it('should be able to register a new pet', async () => {
    const organization = await organizationsRepository.create({
      name: 'Pet Love',
      email: 'petlove@example.com',
      password_hash: await hash('123456', 6),
      whatsapp: '11999999999',
      address: 'Street Example, 123',
    })

    const { pet } = await sut.execute({
      name: 'Buddy',
      description: 'A lovely dog',
      age: 2,
      size: 'MEDIUM',
      energy_level: 4,
      independence: 'MEDIUM',
      type: 'DOG',
      organization_id: organization.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })

  it('should not be able to register a pet with non-existing organization', async () => {
    await expect(() =>
      sut.execute({
        name: 'Buddy',
        description: 'A lovely dog',
        age: 2,
        size: 'MEDIUM',
        energy_level: 4,
        independence: 'MEDIUM',
        type: 'DOG',
        organization_id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
}) 