import { Injectable } from '@nestjs/common';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series } from './entities/series.entity';
import {Repository, SelectQueryBuilder} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PageOptionsDto } from './dto/page-options.dto';
import {PageDto} from "./dto/page.dto.";
import { PageMetaDto } from './dto/page-meta.dto';

@Injectable()
export class SeriesService {
  constructor(
    @InjectRepository(Series)
    private readonly seriesRepository: Repository<Series>,
  ) {}

  async getSeriesByBrand(brandName: string): Promise<Series[]> {
    return await this.seriesRepository.find({
      relations: ['brand'],
      where: { brand: { brandName: brandName } },
    });
  }

  async getSeries(): Promise<Series[]> {
    return await this.seriesRepository.find();
  }

  async getSeriesById(id: number): Promise<Series> {
    return await this.seriesRepository.findOne({ where: { id: id } });
  }

  async getPriceRangeByBrand(
    brandName: string,
  ): Promise<{ minPrice: number; maxPrice: number }> {
    const series = await this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.brand', 'brand')
      .where('brand.brandName = :brandName', { brandName })
      .select('MIN(series.price)', 'minPrice')
      .addSelect('MAX(series.price)', 'maxPrice')
      .getRawOne();

    const minPrice = series.minPrice;
    const maxPrice = series.maxPrice;

    return { minPrice, maxPrice };
  }

  async getSeriesCharacteristics(
    brandName: string,
    seriesName: string,
  ): Promise<Series> {
    return await this.seriesRepository.findOne({
      where: { brand: { brandName }, seriesName },
    });
  }

  async getFilteredSeries(
    searchQuery: string,
    pageOptionsDto: PageOptionsDto,
    minPrice: number,
    maxPrice: number,
    brandName: string,
    seriesName: string,
    screenDiagonal: number,
    ram: number,
    builtInMemory: number,
    batteryCapacity: number,
    mainCamera: string,
    mainCameraFeatures: string,
    frontCamera: string,
    processorName: string,
    operatingSystem: string,
    security: string,
    simCards: number,
    countryProducer: string,
    quantity: number,
    productStatus: string,
  ): Promise<PageDto<Series>> {
    const query: SelectQueryBuilder<Series> = this.seriesRepository
      .createQueryBuilder('series')
      .leftJoinAndSelect('series.brand', 'brand')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take)

    // if (searchQuery) {
    //     query.where('MATCH(series.seriesName) AGAINST (:searchQuery)', {searchQuery})
    //     .where('MATCH(brand.brandName) AGAINST (:searchQuery)', {searchQuery})
    // }

    const itemCount: number = await query.getCount();

    const pageMetaDto: PageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    switch (true) {
      case !!minPrice && !!maxPrice:
        query.andWhere('series.price BETWEEN :minPrice AND :maxPrice', {
          minPrice,
          maxPrice,
        });
        break;
      case !!brandName:
        query.andWhere('brand.brandName = :brandName', { brandName });
        break;
      case !!seriesName:
        query.andWhere('series.seriesName = :seriesName', { seriesName });
        break;
      case !!screenDiagonal:
        query.andWhere('series.screenDiagonal = :screenDiagonal', {
          screenDiagonal,
        });
        break;
      case !!ram:
        query.andWhere('series.ram = :ram', { ram });
        break;
      case !!builtInMemory:
        query.andWhere('series.builtInMemory = :builtInMemory', {
          builtInMemory,
        });
        break;
      case !!batteryCapacity:
        query.andWhere('series.batteryCapacity = :batteryCapacity', {
          batteryCapacity,
        });
        break;
      case !!mainCamera:
        query.andWhere('series.mainCamera = :mainCamera', { mainCamera });
        break;
      case !!mainCameraFeatures:
        query.andWhere('series.mainCameraFeatures = :mainCameraFeatures', {
          mainCameraFeatures,
        });
        break;
      case !!frontCamera:
        query.andWhere('series.frontCamera = :frontCamera', { frontCamera });
        break;
      case !!processorName:
        query.andWhere('series.processorName = :processorName', {
          processorName,
        });
        break;
      case !!operatingSystem:
        query.andWhere('series.operatingSystem = :operatingSystem', {
          operatingSystem,
        });
        break;
      case !!security:
        query.andWhere('series.security = :security', { security });
        break;
      case !!simCards:
        query.andWhere('series.simCards = :simCards', { simCards });
        break;
      case !!countryProducer:
        query.andWhere('series.countryProducer = :countryProducer', {
          countryProducer,
        });
        break;
      case !!quantity:
        query.andWhere('series.quantity = :quantity', { quantity });
        break;
      case !!productStatus:
        query.andWhere('series.productStatus = :productStatus', {
          productStatus,
        });
        break;
      default:
        break;
    }
    const entities: Series[] = await query.getMany();

    return new PageDto(entities, pageMetaDto);
  }

  findAll() {
    return `This action returns all series`;
  }

  findOne(id: number) {
    return `This action returns a #${id} series`;
  }

  update(id: number, updateSeriesDto: UpdateSeriesDto) {
    return `This action updates a #${id} series`;
  }

  remove(id: number) {
    return `This action removes a #${id} series`;
  }
}
