import { ApiProperty } from '@nestjs/swagger';

export class CreateSeriesDto {
  @ApiProperty({ name: 'id', type: 'number' })
  readonly id: number;

  @ApiProperty({ name: 'name', type: 'string' })
  readonly name: string;

  @ApiProperty({name: 'brandId', type: 'number'})
  readonly brandId: number;

  @ApiProperty({name: 'price', type: 'number'})
  readonly price: number;

  @ApiProperty({name: 'screenDiagonal', type: 'number'})
  readonly screenDiagonal: number;

  @ApiProperty({name: 'ram', type: 'number'})
  readonly ram: number;

  @ApiProperty({name: 'builtInMemory', type: 'number'})
  readonly builtInMemory: number;

  @ApiProperty({ name: 'batteryCapacity', type: 'number' })
  readonly batteryCapacity: number;

  @ApiProperty({ name: 'mainCamera', type: 'string' })
  readonly mainCamera: string;

  @ApiProperty({ name: 'mainCameraFeatures', type: 'string' })
  readonly mainCameraFeatures: string;

  @ApiProperty({ name: 'frontCamera', type: 'string' })
  readonly frontCamera: string;

  @ApiProperty({ name: 'processorName', type: 'string' })
  readonly processorName: string;

  @ApiProperty({ name: 'operatingSystem', type: 'string' })
  readonly operatingSystem: string;

  @ApiProperty({ name: 'security', type: 'string' })
  readonly security: string;

  @ApiProperty({ name: 'simCards', type: 'string' })
  readonly simCards: number;

  @ApiProperty({ name: 'countryProducer', type: 'string' })
  readonly countryProducer: string;

  @ApiProperty({ name: 'quantity', type: 'string' })
  readonly quantity: number;
}
