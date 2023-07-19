import { ApiProperty } from '@nestjs/swagger';
import { Length, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @MinLength(2, { message: 'Имя должно состоять не менее чем из 2 символов' })
  readonly login: string;

  @ApiProperty()
  @MinLength(2, { message: 'Имя должно состоять не менее чем из 2 символов' })
  readonly first_name: string;

  @ApiProperty()
  @MinLength(2, { message: 'Имя должно состоять не менее чем из 2 символов' })
  readonly password: string;

  @ApiProperty()
  @MinLength(2, { message: 'Имя должно состоять не менее чем из 2 символов' })
  readonly email: string;

  @ApiProperty()
  @Length(10, 12, { message: 'Номер телефона должен состоять из 10-12 цифр' })
  readonly phone?: string;

  @ApiProperty()
  @MinLength(2, { message: 'Имя должно состоять не менее чем из 2 символов' })
  readonly last_name?: string;
}
