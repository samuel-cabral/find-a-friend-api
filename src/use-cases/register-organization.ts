import { hash } from 'bcryptjs'
import { Organization, OrganizationsRepository } from '@/repositories/organizations-repository'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

interface RegisterOrganizationUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  address: string
}

interface RegisterOrganizationUseCaseResponse {
  organization: Organization
}

export class RegisterOrganizationUseCase {
  constructor(private organizationsRepository: OrganizationsRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    address,
  }: RegisterOrganizationUseCaseRequest): Promise<RegisterOrganizationUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const organizationWithSameEmail = await this.organizationsRepository.findByEmail(
      email,
    )

    if (organizationWithSameEmail) {
      throw new OrganizationAlreadyExistsError()
    }

    const organization = await this.organizationsRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
      address,
    })

    return {
      organization,
    }
  }
} 