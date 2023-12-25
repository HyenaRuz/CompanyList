import {
  UnauthorizedException,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { UserService } from 'src/user/user.service'
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email)
    const passswordIsMatch = await argon2.verify(user.password, password)

    if (user && passswordIsMatch) {
      return user
    }
    throw new UnauthorizedException('User or password mismatch')
  }

  async login(data: { email: string; password: string }) {
    const { password, email } = data
    const user = await this.userService.findOneByEmail(email)

    if (!user) {
      throw new NotFoundException('Incorrect data')
    }

    const { password: passwordHash, ...userData } = user

    const passswordIsMatch = await argon2.verify(passwordHash, password)

    if (!passswordIsMatch) {
      throw new NotFoundException('Incorrect data')
    }

    const tokens = await this.getTokens(userData.id, email)

    return {
      ...userData,
      ...tokens,
    }
  }

  async signup(createUserDto: CreateUserDto) {
    const existUser = await this.userService.findOneByEmail(createUserDto.email)
    if (existUser) throw new BadRequestException('This email already taken')

    const user = await this.userService.create(createUserDto)

    const tokens = await this.getTokens(user.id, user.email)

    return { ...user, ...tokens }
  }

  async getProfile(userId: number) {
    const user = await this.userService.findOneById(+userId)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = user
    return userData
  }

  async getTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
      this.jwtService.signAsync(
        {
          id: userId,
          email,
        },
        {
          secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>(
            'JWT_REFRESH_TOKEN_EXPIRATION_TIME',
          ),
        },
      ),
    ])

    return {
      accessToken,
      refreshToken,
    }
  }

  async refreshTokens(refreshToken: string) {
    try {
      const res = await this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET'),
      })
      return this.getTokens(res.id, res.email)
    } catch (err) {
      throw new BadRequestException('Refresh token was expired')
    }
  }
}
