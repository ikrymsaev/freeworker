import { ApiProperty } from '@nestjs/swagger';
import { CategoryDto } from 'src/resources/category/dto/category.dto';

export class ServiceDto {
  @ApiProperty()
  readonly service_id: number;
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly description: string;
  @ApiProperty()
  readonly category: CategoryDto;
}
