import { TelegrafModule } from 'nestjs-telegraf';
import { tgBotApiKey } from 'config/telegram';
import { DynamicModule } from '@nestjs/common';

const TelegramModule: DynamicModule = TelegrafModule.forRoot({
  token: tgBotApiKey
});

export default TelegramModule;
