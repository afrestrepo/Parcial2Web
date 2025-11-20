import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { CountryEntity  } from '../../countries/country.entity/country.entity';

@Entity()
export class TravelPlanEntity  {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 3 })
  countryCode: string;

  @ManyToOne(() => CountryEntity , { eager: true })
  @JoinColumn({ name: 'countryCode', referencedColumnName: 'alpha3Code' })
  country?: CountryEntity ;

  @Column()
  title: string;

  @Column({ type: 'date' })
  startDate: string;

  @Column({ type: 'date' })
  endDate: string;

  @Column({ nullable: true })
  notes: string;
}
