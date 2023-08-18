import { ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @ApiProperty({ name: 'id', type: 'number' })
  readonly id: number;

  @ApiProperty()
  readonly name: string;
}
