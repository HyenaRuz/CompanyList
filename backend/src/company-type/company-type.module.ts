import { Module } from '@nestjs/common'
import { CompanyTypeService } from './company-type.service'
import { CompanyTypeController } from './company-type.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CompanyType } from '../entities/company-type.entity'
import { Company } from 'src/entities/company.entity'
import { CompaniesService } from 'src/companies/companies.service'

@Module({
  imports: [TypeOrmModule.forFeature([CompanyType, Company])],
  controllers: [CompanyTypeController],
  providers: [CompanyTypeService, CompaniesService],
})
export class CompanyTypeModule {}
