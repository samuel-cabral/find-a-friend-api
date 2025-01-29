import { Organization, OrganizationsRepository } from '../organizations-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrganizationsRepository implements OrganizationsRepository {
  public items: Organization[] = []

  async findByEmail(email: string) {
    const organization = this.items.find((item) => item.email === email)

    if (!organization) {
      return null
    }

    return organization
  }

  async create(data: Omit<Organization, 'id' | 'created_at'>) {
    const organization = {
      id: randomUUID(),
      created_at: new Date(),
      ...data,
    }

    this.items.push(organization)

    return organization
  }
} 