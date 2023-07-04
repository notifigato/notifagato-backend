import { Controller, Body, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { UsersService } from 'services';

import { UserCheckDto, UserMessageSendDto } from 'dto/users';
import { UserCheckModel } from 'models';
import { InternalServerErrorException, NotFoundException } from 'exceptions';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectBot() private tgBot: Telegraf<any>
  ) {}

  @Post('/check')
  @ApiOkResponse({ type: UserCheckModel })
  async checkUser(@Body() { wallet }: UserCheckDto): Promise<UserCheckModel> {
    const user = await this.usersService.getUserByWallet(wallet);

    return {
      isExist: Boolean(user && user.isVerified)
    };
  }

  @Post('/message')
  @ApiOkResponse()
  async sendUserMessage(
    @Body() { receiver, message }: UserMessageSendDto
  ): Promise<void> {
    const receiverUser = await this.usersService.getUserByWallet(receiver);

    const isReceiverExist = Boolean(
      receiverUser && receiverUser.isVerified && receiverUser.telegram
    );

    if (!isReceiverExist) throw new NotFoundException();

    try {
      await this.tgBot.telegram.sendMessage(receiverUser.telegram, message);
    } catch {
      throw new InternalServerErrorException();
    }
  }
}
