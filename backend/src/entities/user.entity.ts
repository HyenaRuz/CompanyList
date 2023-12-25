import { Company } from 'src/entities/company.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base.entity'

@Entity()
export class User extends Base {
  @Column()
  email: string

  @Column()
  password: string

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  nickname: string

  @Column()
  phone: number

  @Column()
  description: string

  @OneToMany(() => Company, (company) => company.user, {
    onDelete: 'CASCADE',
  })
  companies: Company[]

  @Column()
  position: string
}
