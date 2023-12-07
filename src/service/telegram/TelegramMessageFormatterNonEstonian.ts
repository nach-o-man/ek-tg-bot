import { EkiTargetServiceResultSuccessNonEstonian } from '../../types/EkiTargetResult.ts';
import { TelegramMessageFormatter } from './TelegramMessageFormatter.ts';

export class TelegramMessageFormatterNonEstonianMarkdown
    implements
        TelegramMessageFormatter<EkiTargetServiceResultSuccessNonEstonian> {
    constructor(private readonly maximumTranslations: number) {}
    public format(result: EkiTargetServiceResultSuccessNonEstonian): string {
        return `*${
            result.translations.slice(0, this.maximumTranslations).map((val) =>
                `[${val.value}](${val.value})`
            ).join(', ')
        }*`;
    }
}
