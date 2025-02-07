import { randomUUID } from 'node:crypto'
import type { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find(item => item.id === id)
    
    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[]> {
    const pets = this.items.filter(item => item.city.toLowerCase() === city.toLowerCase())
    
    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: randomUUID(),
      created_at: new Date(),
      ...data,
    } as Pet

    this.items.push(pet)

    return pet
  }
} 