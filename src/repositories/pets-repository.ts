import type { Pet, Prisma, Size, Independence, Type } from '@prisma/client'

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
  findById(id: string): Promise<Pet | null>
  findManyByCity(city: string): Promise<Pet[]>
  findManyWithFilters(filters: FindManyFilters): Promise<Pet[]>
}
