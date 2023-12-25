import { AuthService } from './auth.service'
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Body,
  BadRequestException,
} from '@nestjs/common'
import { JwtAuthGuard } from '../guards/jwt-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    return this.authService.login(body)
  }

  @Post('signup')
  async signup(@Body() body) {
    return this.authService.signup(body)
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    return this.authService.getProfile(+req.user.id)
  }

  @Post('refresh-tokens')
  async refreshTokens(@Body() body: { refreshToken: string }) {
    const refreshToken = body.refreshToken
    if (!refreshToken) {
      throw new BadRequestException('Refresh token is not provided')
    }
    return this.authService.refreshTokens(refreshToken)
  }
}
