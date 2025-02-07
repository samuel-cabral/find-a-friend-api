import { Pet, Size, Independence, Type } from '@prisma/client'
import { PetsRepository } from '@/repositories/pets-repository'

interface FilterPetsUseCaseRequest {
  city: string
  age?: number
  size?: Size
  energyLevel?: number
  independence?: Independence
  type?: Type
}

interface FilterPetsUseCaseResponse {
  pets: Pet[]
}

export class FilterPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
    age,
    size,
    energyLevel,
    independence,
    type,
  }: FilterPetsUseCaseRequest): Promise<FilterPetsUseCaseResponse> {
    const pets = await this.petsRepository.findManyWithFilters({
      city,
      age,
      size,
      energyLevel,
      independence,
      type,
    })

    return {
      pets,
    }
  }
} 