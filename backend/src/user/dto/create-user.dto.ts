import { IsEmail, IsString, MinLength } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  email: string

  @MinLength(6, { message: 'Password must be more than six characters' })
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string

  @IsString()
  nickname: string

  @IsString()
  phone: number

  @IsString()
  description: string

  @IsString()
  position: string
}
