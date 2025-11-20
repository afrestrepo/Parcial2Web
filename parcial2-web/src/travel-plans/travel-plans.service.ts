import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TravelPlanEntity  } from './travel-plan.entity/travel-plan.entity';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';
import { CountriesService } from '../countries/countries.service';

@Injectable()
export class TravelPlansService {
  constructor(
    @InjectRepository(TravelPlanEntity )
    private repo: Repository<TravelPlanEntity >,
    private countriesService: CountriesService,
  ) {}

  validateDates(start: string, end: string) {
    if (new Date(start) > new Date(end)) {
      throw new BadRequestException('startDate must be <= endDate');
    }
  }

  async create(dto: CreateTravelPlanDto) {
    this.validateDates(dto.startDate, dto.endDate);

    const exists = await this.countriesService.findByAlpha3(dto.countryCode);
    if (!exists) throw new NotFoundException('Country not found');

    const plan = this.repo.create({
      ...dto,
      countryCode: dto.countryCode.toUpperCase(),
    });

    return this.repo.save(plan);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(id: number, dto: UpdateTravelPlanDto) {
    const plan = await this.findOne(id);
    if (!plan) throw new NotFoundException('TravelPlan not found');

    if (dto.startDate && dto.endDate) {
      this.validateDates(dto.startDate, dto.endDate);
    }

    Object.assign(plan, dto);
    return this.repo.save(plan);
  }

  async remove(id: number) {
    const plan = await this.findOne(id);
    if (!plan) throw new NotFoundException();

    await this.repo.remove(plan);
    return { deleted: true };
  }
}
