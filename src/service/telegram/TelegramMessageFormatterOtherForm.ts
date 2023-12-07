import { EkiTargetServiceResultSuccessOtherForm } from '../../types/EkiTargetResult.ts';
import { TelegramMessageFormatter } from './TelegramMessageFormatter.ts';

export class TelegramMessageFormatterOtherFormMarkdown
    implements
        TelegramMessageFormatter<EkiTargetServiceResultSuccessOtherForm> {
    public format(result: EkiTargetServiceResultSuccessOtherForm): string {
        const forms = result.forms.map((form) => `*${form}*`).join(
            ', ',
        );
        return `This is a form of: ${forms}`;
    }
}
