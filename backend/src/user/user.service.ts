import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../entities/user.entity'
import { Repository } from 'typeorm'
import * as argon2 from 'argon2'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(
    userData: Omit<
      User,
      'createdAt' | 'updatedAt' | 'deletedAt' | 'companies' | 'id'
    >,
  ) {
    const user = await this.userRepository.save({
      ...userData,
      password: await argon2.hash(userData.password),
    })

    delete user.password

    return user
  }

  findAll() {
    return `This action returns all user`
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } })
  }

  async findOneById(id: number) {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException('Company not found')
    return user
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const isExisting = await this.userRepository.findOne({
      where: { id: userId },
    })
    if (!isExisting) throw new NotFoundException('User not found')

    if (updateUserDto.email !== isExisting.email) {
      const user = await this.userRepository.findBy({
        email: updateUserDto.email,
      })
      if (user.length) throw new BadRequestException('Email is already taken')
    }

    return await this.userRepository.update(+userId, updateUserDto)
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`
  // }
}
