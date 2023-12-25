import { Param, Patch, Req, UseGuards } from '@nestjs/common'
import { Controller, Get, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { UpdateUserDto } from './dto/update-user.dto'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  findOneById(@Param('id') id: string) {
    return this.userService.findOneById(+id)
  }

  @Patch()
  @UseGuards(JwtAuthGuard)
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+req.user.id, updateUserDto)
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
