import { Controller, Get, Param } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private svc: CountriesService) {}

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':alpha3')
  async findOne(@Param('alpha3') alpha3: string) {
    return this.svc.findByAlpha3(alpha3);
  }
}
