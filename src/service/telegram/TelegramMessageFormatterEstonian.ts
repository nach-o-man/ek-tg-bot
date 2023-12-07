import { EkiTargetServiceResultSuccessEstonian } from '../../types/EkiTargetResult.ts';
import { TelegramMessageFormatter } from './TelegramMessageFormatter.ts';

export class TelegramMessageFormatterEstonianMarkdown
    implements TelegramMessageFormatter<EkiTargetServiceResultSuccessEstonian> {
    constructor(private readonly maximumTranslations: number) {}

    public format(result: EkiTargetServiceResultSuccessEstonian): string {
        const otherForms = result.otherForms.length > 0
            ? `\n\nAlso other form of: ${result.otherForms.join(', ')}`
            : '';

        const translations = result.translations.length === 0
            ? ''
            : `*${
                result.translations.slice(0, this.maximumTranslations).map((
                    val,
                ) => val.value.replace('-', '\\-'))
                    .join(', ')
            }*\n\n`;

        const isNoun = result.forms.sg1;
        const isVerb = result.forms.ma;

        const forms = isNoun
            ? `${result.forms.sg1} \\- ${result.forms.sg2} \\- ${result.forms.sg3}\n${result.forms.pl1} \\- ${result.forms.pl2} \\- ${result.forms.pl3}`
            : (isVerb
                ? `${result.forms.ma} \\- ${result.forms.da}\n${result.forms.pr1} \\- ${result.forms.prneg}\n${result.forms.past1} \\- ${result.forms.pastneg}`
                : '');

        return `${result.word}\n\n${translations}${forms}${otherForms}`;
    }
}
