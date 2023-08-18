import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Series } from '../../series/entities/series.entity';

@Entity('brands')
export class Brands {
  @PrimaryColumn()
  id: number;

  @Column()
  brandName: string;

  @OneToMany(() => Series, (series: Series) => series.brand)
  series: Series[];
}
