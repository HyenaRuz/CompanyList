import { IsString, IsNumber } from 'class-validator'
import { CompanyType } from 'src/entities/company-type.entity'
import { User } from 'src/entities/user.entity'

export class CreateCompanyDto {
  @IsString()
  name: string

  user: User

  @IsString()
  address: string

  @IsString()
  service: string

  @IsNumber()
  employees: number

  @IsString()
  description: string

  type: CompanyType
}
