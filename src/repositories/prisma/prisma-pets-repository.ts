import { prisma } from '@/lib/prisma'
import type { Prisma, Pet } from '@prisma/client'
import { PetsRepository, FindManyFilters, PetWithOrganization } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<PetWithOrganization | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
      include: {
        organization: true,
      },
    })

    if (!pet) {
      return null
    }

    return {
      ...pet,
      organization: pet.organization,
    }
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = await prisma.pet.findMany({
      where: {
        city,
      },
    })

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }

  async findManyWithFilters(filters: FindManyFilters) {
    const { city, age, size, energyLevel, independence, type } = filters

    const pets = await prisma.pet.findMany({
      where: {
        city,
        ...(age && { age }),
        ...(size && { size }),
        ...(energyLevel && { energy_level: energyLevel }),
        ...(independence && { independence }),
        ...(type && { type }),
      },
    })

    return pets
  }
} 