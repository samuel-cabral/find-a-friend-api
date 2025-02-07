import { Pet, PetsRepository, CreatePetData } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string) {
    const pet = this.items.find(item => item.id === id)
    
    if (!pet) {
      return null
    }

    return pet
  }

  async create(data: CreatePetData) {
    const pet = {
      id: randomUUID(),
      created_at: new Date(),
      ...data,
    }

    this.items.push(pet)

    return pet
  }
} 