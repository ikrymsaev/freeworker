import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  city_id: number;

  @ApiProperty()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsPhoneNumber()
  phone?: string;

  @ApiProperty()
  @IsString()
  last_name?: string;
}
