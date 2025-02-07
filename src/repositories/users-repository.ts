export interface User {
  id: string
  name: string
  email: string
  password_hash: string
  whatsapp: string
  birth_date: Date
  created_at: Date
}

export interface UsersRepository {
  findByEmail(email: string): Promise<User | null>
  findById(id: string): Promise<User | null>
  create(data: Omit<User, 'id' | 'created_at'>): Promise<User>
} 