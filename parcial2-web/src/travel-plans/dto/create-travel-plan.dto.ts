/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsString, Length, IsDateString, IsOptional } from 'class-validator';

export class CreateTravelPlanDto {

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  @Length(3, 3)
  readonly countryCode: string;

  @IsDateString()
  @IsNotEmpty()
  readonly startDate: string;

  @IsDateString()
  @IsNotEmpty()
  readonly endDate: string;

  @IsString()
  @IsOptional()
  readonly notes?: string;
}
