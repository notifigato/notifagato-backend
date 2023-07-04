import { ApiProperty } from '@nestjs/swagger';

export class AuthorizeModel {
  @ApiProperty()
  code: string;

  @ApiProperty()
  link: string;
}
