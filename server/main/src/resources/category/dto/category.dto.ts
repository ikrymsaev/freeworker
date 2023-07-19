import { ApiProperty } from '@nestjs/swagger';
import { ServiceDto } from 'src/resources/service/dto/service.dto';

export class CategoryDto {
  @ApiProperty()
  readonly category_id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly services?: ServiceDto[];
}
