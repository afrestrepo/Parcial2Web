import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CountryEntity  } from './country.entity/country.entity';
import { TravelPlanEntity } from '../travel-plans/travel-plan.entity/travel-plan.entity';
import { AdminGuard } from './guards/admin.guard';

@Module({
  imports: [TypeOrmModule.forFeature([CountryEntity, TravelPlanEntity])],
  controllers: [CountriesController],
  providers: [CountriesService,AdminGuard],
  exports: [CountriesService],
})
export class CountriesModule {}
