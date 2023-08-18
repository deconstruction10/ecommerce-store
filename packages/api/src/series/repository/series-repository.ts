import { EntityRepository, Repository } from 'typeorm';
import { Series } from '../entities/series.entity';

@EntityRepository(Series)
export class SeriesRepository extends Repository<Series> {}
