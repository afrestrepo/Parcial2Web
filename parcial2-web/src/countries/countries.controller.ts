import { Controller, Delete, Get, Param, UseGuards } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { AdminGuard } from './guards/admin.guard';

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

  @Delete(':alpha3')
  @UseGuards(AdminGuard)
  delete(@Param('alpha3') alpha3: string) {
    return this.svc.deleteByAlpha3(alpha3);
  }
}
