import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { GetPetDetailsUseCase } from './get-pet-details'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let petsRepository: InMemoryPetsRepository
let sut: GetPetDetailsUseCase

describe('Get Pet Details Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailsUseCase(petsRepository)
  })

  it('should be able to get pet details', async () => {
    const createdPet = await petsRepository.create({
      name: 'Buddy',
      description: 'A lovely dog',
      age: 2,
      size: 'MEDIUM',
      energy_level: 4,
      independence: 'MEDIUM',
      type: 'DOG',
      organization_id: 'organization-1',
    })

    const { pet } = await sut.execute({
      petId: createdPet.id,
    })

    expect(pet.id).toEqual(createdPet.id)
    expect(pet.name).toEqual('Buddy')
  })

  it('should not be able to get details of non-existing pet', async () => {
    await expect(() =>
      sut.execute({
        petId: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
}) 