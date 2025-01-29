import { describe, it, expect, beforeEach } from 'vitest'
import { RegisterOrganizationUseCase } from './register-organization'
import { InMemoryOrganizationsRepository } from '@/repositories/in-memory/in-memory-organizations-repository'
import { compare } from 'bcryptjs'
import { OrganizationAlreadyExistsError } from './errors/organization-already-exists-error'

let organizationsRepository: InMemoryOrganizationsRepository
let sut: RegisterOrganizationUseCase

describe('Register Organization Use Case', () => {
  beforeEach(() => {
    organizationsRepository = new InMemoryOrganizationsRepository()
    sut = new RegisterOrganizationUseCase(organizationsRepository)
  })

  it('should be able to register a new organization', async () => {
    const { organization } = await sut.execute({
      name: 'Pet Love',
      email: 'petlove@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Street Example, 123',
    })

    expect(organization.id).toEqual(expect.any(String))
    expect(organization).toEqual(
      expect.objectContaining({
        name: 'Pet Love',
        email: 'petlove@example.com',
      })
    )
  })

  it('should hash organization password upon registration', async () => {
    const { organization } = await sut.execute({
      name: 'Pet Love',
      email: 'petlove@example.com',
      password: '123456',
      whatsapp: '11999999999',
      address: 'Street Example, 123',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      organization.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'petlove@example.com'

    await sut.execute({
      name: 'Pet Love',
      email,
      password: '123456',
      whatsapp: '11999999999',
      address: 'Street Example, 123',
    })

    await expect(() =>
      sut.execute({
        name: 'Pet Love',
        email,
        password: '123456',
        whatsapp: '11999999999',
        address: 'Street Example, 123',
      }),
    ).rejects.toBeInstanceOf(OrganizationAlreadyExistsError)
  })
}) 