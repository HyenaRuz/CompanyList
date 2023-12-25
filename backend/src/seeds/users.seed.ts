import { Connection } from 'typeorm'
import { User } from 'src/entities/user.entity'
import * as argon2 from 'argon2'

export const userSeed = async (connection: Connection): Promise<void> => {
  const userRepository = connection.getRepository(User)

  const users = [
    {
      email: 'john@example.com',
      password: await argon2.hash('qwerty'),
      firstName: 'John',
      lastName: 'Doe',
      nickname: 'johndoe',
      phone: 1234567890,
      description: 'Some description',
      position: 'Developer',
    },
    {
      email: 'jane@example.com',
      password: await argon2.hash('qwerty'),
      firstName: 'Jane',
      lastName: 'Smith',
      nickname: 'janesmith',
      phone: 1234567890,
      description: 'Another description',
      position: 'Manager',
    },
    {
      email: 'bob@example.com',
      password: await argon2.hash('qwerty'),
      firstName: 'Bob',
      lastName: 'Johnson',
      nickname: 'bobjohnson',
      phone: 1234567890,
      description: 'Yet another description',
      position: 'Designer',
    },
  ]

  await userRepository.save(users)
}
