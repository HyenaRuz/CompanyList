import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard'
import { AuthorGuard } from 'src/guards/author.guard'
import { Company } from 'src/entities/company.entity'

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe())
  create(@Body() createCompanyDto: CreateCompanyDto, @Req() req) {
    return this.companiesService.create(createCompanyDto, +req.user.id)
  }

  @Get(':type/find')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findAllByName(@Req() req, @Param() name: string) {
    return this.companiesService.findAllByName(+req.user.id, name)
  }

  @Get('pagination')
  @UseGuards(JwtAuthGuard)
  findAllWithPagination(
    @Req() req,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.companiesService.findAllWithPagination(
      +req.user.id,
      +page,
      +limit,
    )
  }

  @Get(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(+id)
  }

  @Patch(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Req() req,
  ) {
    return this.companiesService.update(+id, updateCompanyDto, +req.user.id)
  }

  @Delete(':type/:id')
  @UseGuards(JwtAuthGuard, AuthorGuard)
  remove(@Param('id') id: string) {
    return this.companiesService.remove(+id)
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  async getAllCompanies(
    @Req() req,
    @Query('sortBy') sortBy: string,
    @Query('sortOrder') sortOrder: 'ASC' | 'DESC',
  ): Promise<Company[]> {
    return this.companiesService.getAllCompanies(
      +req.user.id,
      sortBy,
      sortOrder,
    )
  }
}
