import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { UsersService, JwtService } from 'services';
import { AuthorizeDto, TokenDto } from 'dto/auth';
import { tgBotLink } from 'config/telegram';
import { AuthorizeModel } from 'models';
import { AccessDeniedException, UnauthorizedException } from 'exceptions';
import { IUserContext } from 'abstractions/interfaces';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  @Post('/authorize')
  @ApiOkResponse({ type: AuthorizeModel })
  async authorize(@Body() { wallet }: AuthorizeDto): Promise<AuthorizeModel> {
    let user = await this.usersService.getUserByWallet(wallet);

    if (!user) {
      user = await this.usersService.createUser({
        wallet
      });
    }

    return {
      code: user.code,
      link: `${tgBotLink}?start=${user.code}`
    };
  }

  @Post('/token')
  @ApiOkResponse({ type: String })
  async getToken(@Body() { wallet, code }: TokenDto): Promise<string> {
    let user = await this.usersService.getUserByWallet(wallet);

    if (!user) throw new UnauthorizedException();
    if (user.code !== code || !user.isVerified)
      throw new AccessDeniedException();

    const userContext: IUserContext = {
      id: user.id,
      wallet: user.wallet
    };

    return this.jwtService.signAsync(userContext);
  }
}
