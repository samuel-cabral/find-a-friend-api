import type { Pet, Prisma, Size, Independence, Type } from '@prisma/client'

export interface PetWithOrganization extends Pet {
  organization: {
    id: string
    name: string
    email: string
    whatsapp: string
    address: string
    created_at: Date
  }
}

export interface FindManyFilters {
  city: string
  age?: number
  size?: Size
  energyLevel?: number
  independence?: Independence
  type?: Type
}

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<PetWithOrganization | null>
  findManyByCity(city: string): Promise<Pet[]>
  findManyWithFilters(filters: FindManyFilters): Promise<Pet[]>
}
