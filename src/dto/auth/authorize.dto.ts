import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthorizeDto {
  @ApiProperty()
  @IsNotEmpty()
  wallet: string;
}
