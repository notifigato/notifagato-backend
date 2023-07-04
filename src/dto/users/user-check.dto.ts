import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserCheckDto {
  @ApiProperty()
  @IsNotEmpty()
  wallet: string;
}
