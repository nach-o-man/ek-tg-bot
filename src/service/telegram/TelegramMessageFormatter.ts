import { EkiTargetResultSuccess } from '../../types/EkiTargetResult.ts';

export interface TelegramMessageFormatter<T extends EkiTargetResultSuccess> {
    format(result: T): string;
}
