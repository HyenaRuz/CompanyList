import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCompanyTypeDto } from './dto/create-company-type.dto'
import { UpdateCompanyTypeDto } from './dto/update-company-type.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { CompanyType } from 'src/entities/company-type.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CompanyTypeService {
  constructor(
    @InjectRepository(CompanyType)
    private readonly companyTypeRepositoty: Repository<CompanyType>,
  ) {}
  async create(createCompanyTypeDto: CreateCompanyTypeDto) {
    const isExist = await this.companyTypeRepositoty.findBy({
      title: createCompanyTypeDto.title,
    })
    if (isExist.length)
      throw new BadRequestException('CompanyType already exists')

    const newCompanyType = {
      title: createCompanyTypeDto.title,
    }

    return await this.companyTypeRepositoty.save(newCompanyType)
  }

  async findAll() {
    return await this.companyTypeRepositoty.find()
  }
  findOne(id: number) {
    return `This action returns a #${id} companyType`
  }

  update(id: number, updateCompanyTypeDto: UpdateCompanyTypeDto) {
    return `This action updates a #${id} companyType`
  }

  remove(id: number) {
    return `This action removes a #${id} companyType`
  }
}
