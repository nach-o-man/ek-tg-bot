import { Bot } from 'grammy';
import { TelegramBotMessageFormatter } from './TelegramBotMessageFormatter.ts';
import { EkilexTargetService } from '../EkiTargetService.ts';
import { EkiTargetResult } from '../../types/EkiTargetResult.ts';

export class EkilexTelegramBot {
    private readonly telegramBotMessageFormatter: TelegramBotMessageFormatter =
        new TelegramBotMessageFormatter();

    constructor(
        private readonly apiKey: string,
        private readonly ekilexApi: EkilexTargetService,
        private readonly allowedUsers: ReadonlyArray<number>,
    ) {
    }

    private getForbiddenMessage(chatId: number): string | null {
        if (this.allowedUsers.includes(chatId)) {
            return null;
        }
        console.log(this.allowedUsers);

        console.log(`User ${chatId} tried to usse the bot`);

        return `You are not authorized to use this bot. Please provide your chatId to the bot adsmin: ${chatId}`;
    }

    public async run() {
        console.log('Starting bot');

        const bot = new Bot(this.apiKey);

        bot.command('start', (ctx) => {
            const forbiden: string | null = this.getForbiddenMessage(
                ctx.chat.id,
            );

            return ctx.reply(forbiden ? forbiden : 'Tere!');
        });

        bot.on('message:text', async (ctx) => {
            const forbiden: string | null = this.getForbiddenMessage(
                ctx.chat.id,
            );

            if (forbiden) {
                return ctx.reply(forbiden);
            }

            // handle text messages
            const input: string = ctx.message.text;
            console.log('calling find with input: ' + input);
            let result: string | EkiTargetResult = '';
            try {
                result = await this.ekilexApi.find(input);
                return ctx.reply(
                    this.telegramBotMessageFormatter.format(result, input),
                    {
                        reply_to_message_id: ctx.message.message_id,
                        parse_mode: 'MarkdownV2',
                    },
                );
            } catch (err: unknown) {
                console.error((err as Error).message);
                return ctx.reply(
                    `Something wrong happened : [Try sonaveeb](https://sonaveeb.ee/search/unif/dlall/dsall/${input})`,
                    {
                        reply_to_message_id: ctx.message.message_id,
                        parse_mode: 'MarkdownV2',
                    },
                );
            }
        });
        bot.catch((err) => {
            console.error(err);
        });

        await bot.start();
    }
}
