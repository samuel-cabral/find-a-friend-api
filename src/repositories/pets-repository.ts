export interface Pet {
  id: string
  name: string
  description: string
  age: number
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level: number
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  type: 'DOG' | 'CAT'
  organization_id: string
  created_at: Date
}

export interface CreatePetData {
  name: string
  description: string
  age: number
  size: 'SMALL' | 'MEDIUM' | 'LARGE'
  energy_level: number
  independence: 'LOW' | 'MEDIUM' | 'HIGH'
  type: 'DOG' | 'CAT'
  organization_id: string
}

export interface PetsRepository {
  create(data: CreatePetData): Promise<Pet>
  findById(id: string): Promise<Pet | null>
} 