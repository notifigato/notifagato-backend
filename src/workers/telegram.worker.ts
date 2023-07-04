import { Update, Ctx, Start, Help, On } from 'nestjs-telegraf';
import { UsersService } from 'services';

@Update()
export class TelegramWorker {
  constructor(private readonly usersService: UsersService) {}

  private async verifyCode(
    code: string,
    telegramId: string,
    ctx: any
  ): Promise<void> {
    if (!telegramId) {
      ctx.reply('Bot request error');
      return;
    }

    if (!code) {
      ctx.reply('Please enter your personal code:');
      return;
    }

    const user = await this.usersService.getUserByCode(code);

    if (!user) {
      ctx.reply('Invalid personal code!');
      return;
    }

    await this.usersService.updateUserById(user.id, {
      telegram: String(telegramId),
      isVerified: true
    });

    ctx.reply('Your verified success');
  }

  @Start()
  async start(@Ctx() ctx) {
    const code = ctx.startPayload;
    const telegramId = ctx.from.id;

    await this.verifyCode(code, telegramId, ctx);
  }

  @Help()
  async help(@Ctx() ctx) {
    ctx.reply('Please use start command with your personal code');
  }

  @On('message')
  async onMessage(@Ctx() ctx) {
    const code = ctx.message.text;
    const telegramId = ctx.from.id;

    await this.verifyCode(code, telegramId, ctx);
  }
}
