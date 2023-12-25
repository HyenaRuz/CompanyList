import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateCompanyDto } from './dto/create-company.dto'
import { UpdateCompanyDto } from './dto/update-company.dto'
import { Repository } from 'typeorm'
import { Company } from '../entities/company.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto, id: number) {
    const isExist = await this.companyRepository.findBy({
      user: { id },
      name: createCompanyDto.name,
    })

    if (isExist.length) throw new BadRequestException('Company already exists')

    const newCompany = {
      name: createCompanyDto.name,
      address: createCompanyDto.address,
      service: createCompanyDto.service,
      employees: createCompanyDto.employees,
      description: createCompanyDto.description,
      type: { id: +createCompanyDto.type },
      user: { id },
    }
    return await this.companyRepository.save(newCompany)
  }

  async findAll(id: number) {
    return await this.companyRepository.find({
      where: {
        user: { id },
      },
      relations: {
        type: true,
      },
      order: { createdAt: 'DESC' },
    })
  }

  async findOne(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
      relations: { user: true, type: true },
    })

    if (!company) throw new NotFoundException('Company not found')
    return company
  }

  async update(id: number, updateCompanyDto: UpdateCompanyDto, userId: number) {
    const isExisting = await this.companyRepository.findOne({
      where: { id },
    })
    if (!isExisting) throw new NotFoundException('Company not found')

    if (updateCompanyDto.name !== isExisting.name) {
      const isExist = await this.companyRepository.findBy({
        user: { id: userId },
        name: updateCompanyDto.name,
      })

      if (isExist.length)
        throw new BadRequestException('Company already exists')
    }

    return await this.companyRepository.update(+id, updateCompanyDto)
  }

  async remove(id: number) {
    const company = await this.companyRepository.findOne({
      where: { id },
    })
    if (!company) throw new NotFoundException('Company not found')
    return await this.companyRepository.delete(+id)
  }

  async findAllWithPagination(id: number, page: number, limit: number) {
    const company = await this.companyRepository.find({
      where: {
        user: { id },
      },
      take: limit,
      skip: (page - 1) * limit,
    })

    return company
  }

  async findAllByName(id: number, name: string) {
    const companies = await this.companyRepository.find({
      where: {
        user: { id },
        name,
      },
    })
    return companies
  }

  async getAllCompanies(
    userId: number,
    sortBy: string = 'name',
    sortOrder: 'ASC' | 'DESC' = 'ASC',
  ) {
    return this.companyRepository
      .createQueryBuilder('company')
      .where({ user: userId })
      .leftJoinAndSelect('company.type', 'type')
      .orderBy(`LOWER(company.${sortBy})`, sortOrder)
      .getMany()
  }
}
