import { Module, OnApplicationBootstrap } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { CompaniesModule } from './companies/companies.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Company } from './entities/company.entity'
import { AuthModule } from './auth/auth.module'
import { CompanyTypeModule } from './company-type/company-type.module'
import { CompanyType } from './entities/company-type.entity'
import { Connection } from 'typeorm'
import { companyTypeSeed } from './seeds/company-type.seed'
import { companySeed } from './seeds/company.seed'
import { userSeed } from './seeds/users.seed'

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    CompaniesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        synchronize: true,
        entities: [User, Company, CompanyType],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CompanyTypeModule,
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(private connection: Connection) {}

  async onApplicationBootstrap(): Promise<void> {
    await userSeed(this.connection)
    await companyTypeSeed(this.connection)
    await companySeed(this.connection)
  }
}
