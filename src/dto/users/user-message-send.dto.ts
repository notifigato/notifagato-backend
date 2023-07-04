import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class UserMessageSendDto {
  @ApiProperty()
  @IsNotEmpty()
  receiver: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(4096)
  message: string;
}
