import { prisma } from '@/lib/prisma'
import { Pet, PetsRepository, CreatePetData } from '../pets-repository'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })

    return pet
  }

  async create(data: CreatePetData): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
} 