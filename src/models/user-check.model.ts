import { ApiProperty } from '@nestjs/swagger';

export class UserCheckModel {
  @ApiProperty()
  isExist: boolean;
}
