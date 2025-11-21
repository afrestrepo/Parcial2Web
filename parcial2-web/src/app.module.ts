import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountriesModule } from './countries/countries.module';
import { TravelPlansModule } from './travel-plans/travel-plans.module';
import { CountryEntity } from './countries/country.entity/country.entity';
import { TravelPlanEntity } from './travel-plans/travel-plan.entity/travel-plan.entity';
import { LoggingMiddleware } from './common/middleware/logging.middleware';

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
      entities: [CountryEntity, TravelPlanEntity],
    }),
    CountriesModule,
    TravelPlansModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes(  
        { path: 'countries/', method: RequestMethod.ALL },       
        { path: 'countries/*', method: RequestMethod.ALL },        
        { path: 'travel-plans/*', method: RequestMethod.ALL },
        { path: 'travel-plans/', method: RequestMethod.ALL },
      );
  }
}
