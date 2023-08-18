import { EntityRepository, Repository } from 'typeorm';
import { Brands } from '../entities/brand.entity';

@EntityRepository()
export class BrandRepository extends Repository<Brands> {}
