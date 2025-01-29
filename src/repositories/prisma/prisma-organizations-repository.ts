import { prisma } from '@/lib/prisma'
import { Organization, OrganizationsRepository } from '../organizations-repository'

export class PrismaOrganizationsRepository implements OrganizationsRepository {
  async findByEmail(email: string) {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    })

    return organization
  }

  async create(data: Omit<Organization, 'id' | 'created_at'>) {
    const organization = await prisma.organization.create({
      data,
    })

    return organization
  }
} 