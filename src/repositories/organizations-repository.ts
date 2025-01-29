export interface Organization {
  id: string
  name: string
  email: string
  password_hash: string
  whatsapp: string
  address: string
  created_at: Date
}

export interface OrganizationsRepository {
  findByEmail(email: string): Promise<Organization | null>
  create(data: Omit<Organization, 'id' | 'created_at'>): Promise<Organization>
} 