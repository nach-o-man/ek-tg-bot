import { EkiApiClient } from './service/api/EkiApiClient.ts';
import { SonaveebWordFormsService } from './service/api/SonaveebWordFormsService.ts';
import { EkilexConfig } from './config/EkilexConfig.ts';
import { SimpleCurrentTimestampFunction } from './service/function/CurrentTimestampFunction.ts';
import { SonaveebWordFormFunction } from './service/function/SonaveebWordFormFunction.ts';
import { EkilexTargetService } from './service/EkiTargetService.ts';
import { SonaveebFetchClient } from './service/http/SonaveebFetchClient.ts';
import { EkilexTelegramBot } from './service/telegram/EkilexTelegramBot.ts';
import {
    RateLimiter,
    SimpleRateLimiter,
} from './service/function/RateLimiter.ts';
import { EkiLanguage } from './types/EkiLanguage.ts';
import { assertEnvVar } from './service/util/Utils.ts';

const telegramBotApiKey = assertEnvVar('TELEGRAM_BOT_API_KEY');
const ekilexApiKey = assertEnvVar('EKILEX_API_KEY');
const botAllowedUsers = assertEnvVar('BOT_ALLOWED_USERS');

const rateLimiter: RateLimiter = new SimpleRateLimiter(
    1,
    5,
    new SimpleCurrentTimestampFunction(),
);

const sonaveebWordFormsService = new SonaveebWordFormsService(
    new SonaveebFetchClient(rateLimiter),
    new SonaveebWordFormFunction(),
);

const ekilexConfig: EkilexConfig = {
    apiKey: ekilexApiKey,
    foreignLanguage: EkiLanguage.RUS,
};

const ekiApiClient: EkiApiClient = new EkiApiClient(ekilexConfig, rateLimiter);

const allowedUsers: ReadonlyArray<number> = botAllowedUsers.split(',').map((
    s,
) => parseInt(s));

new EkilexTelegramBot(
    telegramBotApiKey,
    new EkilexTargetService(ekiApiClient, sonaveebWordFormsService),
    allowedUsers,
).run();
