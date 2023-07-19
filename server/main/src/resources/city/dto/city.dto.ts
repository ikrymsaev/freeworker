import { ApiProperty } from '@nestjs/swagger';

export class CityDto {
  @ApiProperty()
  readonly city_id: number;
  @ApiProperty()
  readonly name: string;
}
