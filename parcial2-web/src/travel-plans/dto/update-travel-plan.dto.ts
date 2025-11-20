/* eslint-disable prettier/prettier */
import { IsOptional, IsString, Length, IsDateString } from 'class-validator';

export class UpdateTravelPlanDto {

  @IsString()
  @IsOptional()
  readonly title?: string;

  @IsString()
  @Length(3, 3)
  @IsOptional()
  readonly countryCode?: string;

  @IsDateString()
  @IsOptional()
  readonly startDate?: string;

  @IsDateString()
  @IsOptional()
  readonly endDate?: string;

  @IsString()
  @IsOptional()
  readonly notes?: string;
}
