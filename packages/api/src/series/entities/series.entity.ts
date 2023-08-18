import { Brands } from '../../brands/entities/brand.entity';
import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn} from 'typeorm';

@Entity('phone_series')
export class Series {
  @PrimaryColumn()
  id: number;

  @Index({fulltext: true})
  @Column()
  seriesName: string;

  @Column()
  brandId: number;

  @Column()
  price: number;

  @Column()
  screenDiagonal: number;

  @Column()
  ram: number;

  @Column()
  builtInMemory: number;

  @Column()
  batteryCapacity: number;

  @Column()
  mainCamera: string;

  @Column()
  mainCameraFeatures: string;

  @Column()
  frontCamera: string;

  @Column()
  processorName: string;

  @Column()
  operatingSystem: string;

  @Column()
  security: string;

  @Column()
  simCards: number;

  @Column()
  countryProducer: string;

  @Column()
  productStatus: string;

  @ManyToOne(() => Brands, (brands) => brands.series)
  @JoinColumn({ name: 'brandId' })
  brand: Brands;
}
