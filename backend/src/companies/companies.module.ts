import { Module } from '@nestjs/common'
import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Company } from '../entities/company.entity'
import { CompanyType } from 'src/entities/company-type.entity'
import { CompanyTypeService } from 'src/company-type/company-type.service'

@Module({
  imports: [TypeOrmModule.forFeature([Company, CompanyType])],
  controllers: [CompaniesController],
  providers: [CompaniesService, CompanyTypeService],
})
export class CompaniesModule {}
