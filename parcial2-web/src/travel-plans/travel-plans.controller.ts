import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { TravelPlansService } from './travel-plans.service';
import { CreateTravelPlanDto } from './dto/create-travel-plan.dto';
import { UpdateTravelPlanDto } from './dto/update-travel-plan.dto';

@Controller('travel-plans')
export class TravelPlansController {
  constructor(private svc: TravelPlansService) {}

  @Post()
  create(@Body() dto: CreateTravelPlanDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.svc.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: UpdateTravelPlanDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.svc.remove(id);
  }
}
