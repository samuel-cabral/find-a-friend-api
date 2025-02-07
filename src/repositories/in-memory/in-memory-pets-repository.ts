import { randomUUID } from 'node:crypto'
import type { Pet, Prisma } from '@prisma/client'
import { PetsRepository, FindManyFilters } from '../pets-repository'

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
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      city: data.city,
      age: data.age,
      size: data.size,
      energy_level: data.energy_level,
      independence: data.independence,
      type: data.type,
      organization_id: data.organization_id,
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }

  async findManyWithFilters(filters: FindManyFilters) {
    const { city, age, size, energyLevel, independence, type } = filters

    return this.items.filter((pet) => {
      const matchesCity = pet.city === city
      const matchesAge = age ? pet.age === age : true
      const matchesSize = size ? pet.size === size : true
      const matchesEnergyLevel = energyLevel ? pet.energy_level === energyLevel : true
      const matchesIndependence = independence ? pet.independence === independence : true
      const matchesType = type ? pet.type === type : true

      return (
        matchesCity &&
        matchesAge &&
        matchesSize &&
        matchesEnergyLevel &&
        matchesIndependence &&
        matchesType
      )
    })
  }
} 