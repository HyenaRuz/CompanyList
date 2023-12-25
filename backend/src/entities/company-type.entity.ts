import { Company } from 'src/entities/company.entity'
import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from './base.entity'

@Entity()
export class CompanyType extends Base {
  @Column()
  title: string

  @OneToMany(() => Company, (company) => company.type)
  companies: Company[]
}
