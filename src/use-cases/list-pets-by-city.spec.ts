import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { ListPetsByCityUseCase } from './list-pets-by-city'
import { beforeEach, describe, expect, it } from 'vitest'

let petsRepository: InMemoryPetsRepository
let sut: ListPetsByCityUseCase

describe('List Pets By City Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new ListPetsByCityUseCase(petsRepository)
  })

  it('should be able to list pets by city', async () => {
    await petsRepository.create({
      name: 'Pet 01',
      description: 'Pet description',
      age: 2,
      size: 'MEDIUM',
      energy_level: 4,
      independence: 'MEDIUM',
      type: 'DOG',
      organization_id: 'organization-1',
      city: 'São Paulo',
    })

    await petsRepository.create({
      name: 'Pet 02',
      description: 'Pet description',
      age: 3,
      size: 'SMALL',
      energy_level: 5,
      independence: 'HIGH',
      type: 'CAT',
      organization_id: 'organization-2',
      city: 'São Paulo',
    })

    await petsRepository.create({
      name: 'Pet 03',
      description: 'Pet description',
      age: 1,
      size: 'LARGE',
      energy_level: 3,
      independence: 'LOW',
      type: 'DOG',
      organization_id: 'organization-1',
      city: 'Rio de Janeiro',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(2)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet 01', city: 'São Paulo' }),
      expect.objectContaining({ name: 'Pet 02', city: 'São Paulo' }),
    ])
  })

  it('should return empty array when no pets are found in the city', async () => {
    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(0)
  })

  it('should be case insensitive when searching by city', async () => {
    await petsRepository.create({
      name: 'Pet 01',
      description: 'Pet description',
      age: 2,
      size: 'MEDIUM',
      energy_level: 4,
      independence: 'MEDIUM',
      type: 'DOG',
      organization_id: 'organization-1',
      city: 'São Paulo',
    })

    const { pets } = await sut.execute({
      city: 'são paulo',
    })

    expect(pets).toHaveLength(1)
    expect(pets).toEqual([
      expect.objectContaining({ name: 'Pet 01', city: 'São Paulo' }),
    ])
  })
}) 