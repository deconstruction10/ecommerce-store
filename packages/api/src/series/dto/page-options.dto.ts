import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Order } from '../enums/order';

export class PageOptionsDto {
  constructor(page: number, take: number) {
    this.page = page;
    this.take = take;
  }

  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsOptional()
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  public page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  public take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
