import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { FilterPetsUseCase } from './filter-pets'
import { Size, Independence, Type } from '@prisma/client'

let petsRepository: InMemoryPetsRepository
let sut: FilterPetsUseCase

describe('Filter Pets Use Case', () => {
  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new FilterPetsUseCase(petsRepository)
  })

  it('should be able to filter pets by city', async () => {
    await petsRepository.create({
      name: 'Pet 01',
      description: 'Pet description',
      city: 'São Paulo',
      age: 1,
      energy_level: 5,
      size: Size.SMALL,
      independence: Independence.LOW,
      type: Type.DOG,
      organization_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Pet 02',
      description: 'Pet description',
      city: 'Rio de Janeiro',
      age: 2,
      energy_level: 4,
      size: Size.MEDIUM,
      independence: Independence.MEDIUM,
      type: Type.CAT,
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Pet 01')
  })

  it('should be able to filter pets by multiple characteristics', async () => {
    await petsRepository.create({
      name: 'Pet 01',
      description: 'Pet description',
      city: 'São Paulo',
      age: 1,
      energy_level: 5,
      size: Size.SMALL,
      independence: Independence.LOW,
      type: Type.DOG,
      organization_id: 'org-01',
    })

    await petsRepository.create({
      name: 'Pet 02',
      description: 'Pet description',
      city: 'São Paulo',
      age: 2,
      energy_level: 4,
      size: Size.MEDIUM,
      independence: Independence.MEDIUM,
      type: Type.CAT,
      organization_id: 'org-01',
    })

    const { pets } = await sut.execute({
      city: 'São Paulo',
      type: Type.CAT,
      size: Size.MEDIUM,
    })

    expect(pets).toHaveLength(1)
    expect(pets[0].name).toBe('Pet 02')
  })
}) 