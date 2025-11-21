import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity  } from './country.entity/country.entity';
import { RestCountriesProvider } from './providers/rest-countries.provider';
import { TravelPlanEntity } from '../travel-plans/travel-plan.entity/travel-plan.entity';

@Injectable()
export class CountriesService {
  private provider = new RestCountriesProvider();

  constructor(
    @InjectRepository(CountryEntity )
    private repo: Repository<CountryEntity >,
    @InjectRepository(TravelPlanEntity)
    private travelPlanRepo: Repository<TravelPlanEntity>,
  ) {}

  findAll() {
    return this.repo.find();
  }

  async findByAlpha3(alpha3: string) {
    const code = alpha3.toUpperCase();
    let country = await this.repo.findOne({ where: { alpha3Code: code } });

    if (country) return { country, origin: 'cache' };

    const external = await this.provider.fetchCountry(code);
    if (!external) throw new NotFoundException('Country not found');

    country = this.repo.create(external);
    await this.repo.save(country);

    return { country, origin: 'restcountries' };
  }

  async deleteByAlpha3(alpha3: string) {
    const code = alpha3.toUpperCase();
    const country = await this.repo.findOne({ where: { alpha3Code: code } });
  if (!country) {
      throw new NotFoundException(`Country ${code} not found`);
    }

    const associated = await this.travelPlanRepo.count({ where: { countryCode: code } });
    if (associated > 0) {
      throw new BadRequestException('Cannot delete country: there are associated travel plans');
    }

    await this.repo.remove(country);
    return { deleted: true, alpha3Code: code };
  }
}
