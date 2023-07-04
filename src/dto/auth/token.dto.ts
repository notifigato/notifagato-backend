import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenDto {
  @ApiProperty()
  @IsNotEmpty()
  wallet: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
