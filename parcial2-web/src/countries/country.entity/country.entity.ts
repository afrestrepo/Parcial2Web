import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class CountryEntity  {
  @PrimaryColumn({ length: 3 })
  alpha3Code: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  region: string;

  @Column({ nullable: true })
  subregion: string;

  @Column({ nullable: true })
  capital: string;

  @Column({ type: 'bigint', nullable: true })
  population: number;

  @Column({ nullable: true })
  flag: string;
}
