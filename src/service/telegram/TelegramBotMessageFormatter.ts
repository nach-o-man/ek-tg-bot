import {
    EkiResultType,
    EkiSuccessResultType,
    EkiTargetResult,
    EkiTargetServiceResultSuccessEstonian,
    EkiTargetServiceResultSuccessNonEstonian,
    EkiTargetServiceResultSuccessOtherForm,
} from '../../types/EkiTargetResult.ts';
import { TelegramMessageFormatter } from './TelegramMessageFormatter.ts';
import { TelegramMessageFormatterEstonianMarkdown } from './TelegramMessageFormatterEstonian.ts';
import { TelegramMessageFormatterNonEstonianMarkdown } from './TelegramMessageFormatterNonEstonian.ts';
import { TelegramMessageFormatterOtherFormMarkdown } from './TelegramMessageFormatterOtherForm.ts';

export class TelegramBotMessageFormatter {
    private readonly estonianFormatter: TelegramMessageFormatter<
        EkiTargetServiceResultSuccessEstonian
    > = new TelegramMessageFormatterEstonianMarkdown(5);
    private readonly otherFormFormatter: TelegramMessageFormatter<
        EkiTargetServiceResultSuccessOtherForm
    > = new TelegramMessageFormatterOtherFormMarkdown();
    private readonly nonEstonianFormatter: TelegramMessageFormatter<
        EkiTargetServiceResultSuccessNonEstonian
    > = new TelegramMessageFormatterNonEstonianMarkdown(10);

    public format(message: EkiTargetResult, initWord: string): string {
        if (message.type === EkiResultType.ERROR) {
            return `\u2757 *${message.error}*`;
        }

        const result = message.result;

        switch (result.type) {
            case EkiSuccessResultType.ESTONIAN: {
                return this.estonianFormatter.format(result);
            }
            case EkiSuccessResultType.OTHER_FORM: {
                return this.otherFormFormatter.format(result);
            }
            case EkiSuccessResultType.NON_ESTONIAN: {
                return this.nonEstonianFormatter.format(result);
            }
            default:
        }
        return `Not found: [try sonaveeb](https://sonaveeb.ee/search/unif/dlall/dsall/${initWord})`;
    }
}
