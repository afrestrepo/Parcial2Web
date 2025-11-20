import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryEntity  } from './country.entity/country.entity';
import { RestCountriesProvider } from './providers/rest-countries.provider';

@Injectable()
export class CountriesService {
  private provider = new RestCountriesProvider();

  constructor(
    @InjectRepository(CountryEntity )
    private repo: Repository<CountryEntity >,
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
}
