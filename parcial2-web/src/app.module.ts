import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { CountryEntity  } from './countries/country.entity/country.entity';
import { TravelPlanEntity  } from './travel-plans/travel-plan.entity/travel-plan.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'travel_plans',
      synchronize: true,
      entities: [CountryEntity , TravelPlanEntity ],
    }),
    CountriesModule,
    TravelPlansModule,
  ],
})
export class AppModule {}
