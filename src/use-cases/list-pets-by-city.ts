import { PetsRepository } from '@/repositories/pets-repository'
import type { Pet } from '@prisma/client'

interface ListPetsByCityUseCaseRequest {
  city: string
}

interface ListPetsByCityUseCaseResponse {
  pets: Pet[]
}

export class ListPetsByCityUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    city,
  }: ListPetsByCityUseCaseRequest): Promise<ListPetsByCityUseCaseResponse> {
    const pets = await this.petsRepository.findManyByCity(city)

    return {
      pets,
    }
  }
} 