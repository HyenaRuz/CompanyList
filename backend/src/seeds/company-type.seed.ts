import { CompanyType } from 'src/entities/company-type.entity'
import { Connection } from 'typeorm'

export const companyTypeSeed = async (
  connection: Connection,
): Promise<void> => {
  const companyTypeRepository = connection.getRepository(CompanyType)

  const companyTypes = [
    { title: 'Type 1' },
    { title: 'Type 2' },
    { title: 'Type 3' },
    { title: 'Type 4' },
    { title: 'Type 5' },
  ]

  await companyTypeRepository.save(companyTypes)
}
