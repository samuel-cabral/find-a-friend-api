import { hash } from 'bcryptjs'
import { User, UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { InvalidBirthDateError } from './errors/invalid-birth-date-error'
import dayjs from 'dayjs'

interface RegisterUserUseCaseRequest {
  name: string
  email: string
  password: string
  whatsapp: string
  birth_date: Date
}

interface RegisterUserUseCaseResponse {
  user: User
}

export class RegisterUserUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
    whatsapp,
    birth_date,
  }: RegisterUserUseCaseRequest): Promise<RegisterUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const age = dayjs().diff(birth_date, 'year')

    if (age < 18) {
      throw new InvalidBirthDateError()
    }

    const password_hash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
      whatsapp,
      birth_date,
    })

    return {
      user,
    }
  }
} 