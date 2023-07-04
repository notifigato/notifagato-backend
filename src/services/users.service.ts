import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaRepository } from 'repositories';

const MAGIC_DIGITS = '0123456789';

@Injectable()
export class UsersService {
  private readonly usersRepository: Prisma.UserDelegate<Prisma.RejectOnNotFound>;

  constructor(prismaRepository: PrismaRepository) {
    this.usersRepository = prismaRepository.user;
  }

  private generateCode(magicCodeLength = 12): string {
    let magicCode = '';

    for (let i = 1; i <= magicCodeLength; i++) {
      const index = Math.floor(Math.random() * MAGIC_DIGITS.length);
      magicCode = magicCode + MAGIC_DIGITS[index];
    }

    return magicCode;
  }

  public createUser(info: Omit<Prisma.UserCreateInput, 'code'>): Promise<User> {
    const newUser = { ...info, code: this.generateCode() };

    return this.usersRepository.create({ data: newUser });
  }

  public async updateUserById(
    userId: string,
    info: Partial<Prisma.UserUpdateInput>
  ): Promise<User> {
    return this.usersRepository.update({
      where: {
        id: userId
      },
      data: {
        ...info
      }
    });
  }

  public getUserByWallet(wallet: string): Promise<User | null> {
    return this.usersRepository.findUnique({
      where: {
        wallet
      }
    });
  }

  public getUserByCode(code: string): Promise<User | null> {
    return this.usersRepository.findUnique({
      where: {
        code
      }
    });
  }

  public getAllUsers(): Promise<User[]> {
    return this.usersRepository.findMany();
  }
}
