import { ApiProperty } from '@nestjs/swagger';

export class CreateMasterDto {
  @ApiProperty()
  readonly name: string;
  @ApiProperty()
  readonly surname: string;
  @ApiProperty()
  readonly email: string;
  @ApiProperty()
  readonly phone: string;
  @ApiProperty()
  readonly avatarLink: string;
  @ApiProperty()
  readonly categoryId: number;
}
