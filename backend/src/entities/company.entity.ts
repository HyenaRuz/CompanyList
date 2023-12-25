import { CompanyType } from 'src/entities/company-type.entity'
import { User } from 'src/entities/user.entity'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from './base.entity'

@Entity()
export class Company extends Base {
  @Column()
  name: string

  @Column()
  address: string

  @Column()
  description: string

  @ManyToOne(() => User, (user) => user.companies)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  service: string

  @Column()
  employees: number

  @ManyToOne(() => CompanyType, (companyType) => companyType.companies)
  type: CompanyType
}
