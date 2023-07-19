import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/resources/user/dto/user.dto';

export class RegisterResponseDto {
  @ApiProperty()
  access_token: string;
  @ApiProperty()
  user: UserDto;
}
