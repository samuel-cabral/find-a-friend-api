import { Pet, PetsRepository } from '@/repositories/pets-repository'
import { OrganizationsRepository } from '@/repositories/organizations-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface RegisterPetUseCaseRequest {
  name: string
  description: string
  age: number
  size: string
  energy_level: number
  independence: string
  type: string
  organization_id: string
}

interface RegisterPetUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private organizationsRepository: OrganizationsRepository,
  ) {}

  async execute({
    name,
    description,
    age,
    size,
    energy_level,
    independence,
    type,
    organization_id,
  }: RegisterPetUseCaseRequest): Promise<RegisterPetUseCaseResponse> {
    const organization = await this.organizationsRepository.findById(organization_id)

    if (!organization) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      description,
      age,
      size,
      energy_level,
      independence,
      type,
      organization_id,
    })

    return {
      pet,
    }
  }
} 