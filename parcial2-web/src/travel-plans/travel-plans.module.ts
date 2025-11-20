import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TravelPlansController } from './travel-plans.controller';
import { TravelPlansService } from './travel-plans.service';
import { TravelPlanEntity  } from './travel-plan.entity/travel-plan.entity';
import { CountriesModule } from '../countries/countries.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TravelPlanEntity ]),
    CountriesModule,
  ],
  controllers: [TravelPlansController],
  providers: [TravelPlansService],
})
export class TravelPlansModule {}
