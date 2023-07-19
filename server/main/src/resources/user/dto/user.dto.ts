import { ApiProperty } from '@nestjs/swagger';
import { CityDto } from 'src/resources/city/dto/city.dto';

export class UserDto {
  @ApiProperty()
  readonly user_id: number;

  @ApiProperty()
  readonly login: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phone?: string;

  @ApiProperty()
  readonly first_name: string;

  @ApiProperty()
  readonly last_name?: string;

  @ApiProperty()
  readonly register_date: Date;

  @ApiProperty()
  readonly city?: CityDto;
}
