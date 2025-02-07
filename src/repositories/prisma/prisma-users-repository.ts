import { prisma } from '@/lib/prisma'
import { User, UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Omit<User, 'id' | 'created_at'>) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
} 