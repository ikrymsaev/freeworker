import { ApiProperty, PartialType } from '@nestjs/swagger';
import { UserDto } from './user.dto';

export class TestUserDto extends PartialType(UserDto) {
  @ApiProperty()
  readonly password: string;
}
