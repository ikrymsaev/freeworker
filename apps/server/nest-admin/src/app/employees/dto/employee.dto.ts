import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty()
  readonly personId: string;
  @ApiProperty()
  readonly categoryId: number;
}
