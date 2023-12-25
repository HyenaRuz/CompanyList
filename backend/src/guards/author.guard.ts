import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CompaniesService } from 'src/companies/companies.service'

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly companyService: CompaniesService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()
    const { id, type } = request.params

    let entity

    switch (type) {
      case 'company':
        entity = await this.companyService.findOne(id)
        break
      default:
        throw new NotFoundException('Something went wrong...')
        break
    }

    const user = request.user

    if (entity && user && entity.user.id === user.id) {
      return true
    }
    throw new BadRequestException('Something went wrong...')
  }
}
