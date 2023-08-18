import {
  Body, ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query, UseInterceptors,
} from '@nestjs/common';
import { SeriesService } from './series.service';
import { UpdateSeriesDto } from './dto/update-series.dto';
import { Series } from './entities/series.entity';
import {PageOptionsDto} from "./dto/page-options.dto";
import {PageDto} from "./dto/page.dto.";

@Controller('series')
@UseInterceptors(ClassSerializerInterceptor)
export class SeriesController {
  constructor(private readonly seriesService: SeriesService) {}

  @Get('/filtered')
  async getFilteredSeries(
    @Query('searchQuery') searchQuery: string,
    @Query('page') page: number,
    @Query('take') take: number,
    @Query('minPrice') minPrice: number,
    @Query('maxPrice') maxPrice: number,
    @Query('brandName') brandName: string,
    @Query('seriesName') seriesName: string,
    @Query('screenDiagonal') screenDiagonal: number,
    @Query('ram') ram: number,
    @Query('builtInMemory') builtInMemory: number,
    @Query('batteryCapacity') batteryCapacity: number,
    @Query('mainCamera') mainCamera: string,
    @Query('mainCameraFeatures') mainCameraFeatures: string,
    @Query('frontCamera') frontCamera: string,
    @Query('processorName') processorName: string,
    @Query('operatingSystem') operatingSystem: string,
    @Query('security') security: string,
    @Query('simCards') simCards: number,
    @Query('countryProducer') countryProducer: string,
    @Query('quantity') quantity: number,
    @Query('productStatus') productStatus: string,
  ): Promise<PageDto<Series>> {
    const pages = new PageOptionsDto(page, take);
    return this.seriesService.getFilteredSeries(
      searchQuery,
      pages,
      minPrice,
      maxPrice,
      brandName,
      seriesName,
      screenDiagonal,
      ram,
      builtInMemory,
      batteryCapacity,
      mainCamera,
      mainCameraFeatures,
      frontCamera,
      processorName,
      operatingSystem,
      security,
      simCards,
      countryProducer,
      quantity,
      productStatus,
    );
  }

  @Get('brand')
  async getSeriesByBrand(@Query('brand') brand: string): Promise<Series[]> {
    return this.seriesService.getSeriesByBrand(brand);
  }

  @Get()
  async getSeries(): Promise<Series[]> {
    return this.seriesService.getSeries();
  }

  @Get(':id')
  async getSeriesById(@Param('id') id: number): Promise<Series> {
    return this.seriesService.getSeriesById(id);
  }

  @Get('price-range/:brandName')
  async getPriceRangeByBrand(@Param('brandName') brandName: string) {
    return this.seriesService.getPriceRangeByBrand(brandName);
  }

  @Get('/:brandName/:seriesId/characteristics')
  async getSeriesCharacteristics(
    @Param('brandName') brandName: string,
    @Param('seriesId') seriesName: string,
  ) {
    return await this.seriesService.getSeriesCharacteristics(
      brandName,
      seriesName,
    );
  }
  // @Post()
  // create(@Body() createSeriesDto: CreateSeriesDto) {
  //   return this.seriesService.create(createSeriesDto);
  // }

  @Get()
  findAll() {
    return this.seriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seriesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeriesDto: UpdateSeriesDto) {
    return this.seriesService.update(+id, updateSeriesDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seriesService.remove(+id);
  }
}
