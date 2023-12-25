import { CompanyType } from 'src/entities/company-type.entity'
import { Company } from 'src/entities/company.entity'
import { User } from 'src/entities/user.entity'
import { Connection } from 'typeorm'

export const companySeed = async (connection: Connection): Promise<void> => {
  const companyRepository = connection.getRepository(Company)
  const companyTypeRepository = connection.getRepository(CompanyType)
  const userRepository = connection.getRepository(User)

  const user = await userRepository.findOne({
    where: { email: 'john@example.com' },
  })
  const companyTypes = await companyTypeRepository.find()

  const companies = [
    {
      name: 'Company 1',
      address: 'Address 1',
      description: 'Description 1',
      service: 'Service 1',
      employees: 10,
      type: companyTypes[0],
      user,
    },
    {
      name: 'Company 2',
      address: 'Address 2',
      description: 'Description 2',
      service: 'Service 2',
      employees: 20,
      type: companyTypes[1],
      user,
    },
    {
      name: 'Company 3',
      address: 'Address 3',
      description: 'Description 3',
      service: 'Service 3',
      employees: 30,
      type: companyTypes[2],
      user,
    },
  ]

  await companyRepository.save(companies)
}
