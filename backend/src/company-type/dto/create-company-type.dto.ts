import { IsString } from 'class-validator'

export class CreateCompanyTypeDto {
  @IsString()
  title: string
}
