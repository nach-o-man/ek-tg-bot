import { EkiApiClient } from './api/EkiApiClient.ts';
import {
    EkiExtractTranslationFunction,
} from './function/EkiExtractTranslationFunction.ts';
import { EkiLanguage } from '../types/EkiLanguage.ts';
import {
    EkiResultType,
    EkiSuccessResultType,
    EkiTargetResult,
    EkiTargetServiceResultSuccessBase,
    EkiTargetServiceResultSuccessEstonian,
} from '../types/EkiTargetResult.ts';
import { EkiFormMapper } from './function/EkiFormMapper.ts';
import { SonaveebWordFormsService } from './api/SonaveebWordFormsService.ts';

export class EkilexTargetService {
    constructor(
        private readonly ekiApiClient: EkiApiClient,
        private readonly sonaveebWordFormsService: SonaveebWordFormsService,
    ) {
    }

    public async find(
        word: string,
    ): Promise<EkiTargetResult> {
        const searchResult = await this.ekiApiClient.getWordSearchService()
            .search(word);
        if (searchResult.totalCount === 0) {
            const otherForms = await this.sonaveebWordFormsService.search(word);

            if (otherForms.wordForms.size === 0) {
                return {
                    type: EkiResultType.ERROR,
                    error: 'No results found',
                };
            }

            const wordForms = [...otherForms.wordForms];

            if (wordForms.length > 1) {
                return {
                    type: EkiResultType.SUCCESS,
                    result: {
                        type: EkiSuccessResultType.OTHER_FORM,
                        forms: wordForms,
                    },
                };
            } else if (wordForms.length === 1) {
                return this.find(wordForms[0]);
            }

            return {
                type: EkiResultType.ERROR,
                error: 'No results found',
            };
        }

        // Soe
        const sortedResult = searchResult.words.sort((a, b) =>
            a.wordId - b.wordId
        );

        const detailsResult = await this.ekiApiClient.getWordDetailsService()
            .details(Number(sortedResult[0].wordId));

        const extraTranslations = new EkiExtractTranslationFunction();
        const extraTranslationsResult = await extraTranslations
            .extractTranslation(
                detailsResult,
                this.ekiApiClient.getForeignLanuage(),
            );

        const resultType: EkiSuccessResultType =
            detailsResult.word.lang === EkiLanguage.EST
                ? EkiSuccessResultType.ESTONIAN
                : EkiSuccessResultType.NON_ESTONIAN;

        const resultBase: EkiTargetServiceResultSuccessBase = {
            type: resultType,
            word: detailsResult.word.wordValue,
            translations: extraTranslationsResult,
        };

        if (resultType === EkiSuccessResultType.ESTONIAN) {
            const otherForms = await this.sonaveebWordFormsService.search(
                detailsResult.word.wordValue,
            );

            const result: EkiTargetServiceResultSuccessEstonian = {
                ...resultBase,
                type: resultType,
                otherForms: [...otherForms.wordForms],
                forms: {},
            };

            result.forms = {};
            detailsResult.paradigms[0].forms.forEach((form) => {
                const mappedMorhCode = EkiFormMapper.mapForm(form.morphCode);
                if (mappedMorhCode) {
                    result.forms[mappedMorhCode] = form.value;
                }
            });

            return Promise.resolve({
                type: EkiResultType.SUCCESS,
                result: result,
            });
        }

        return Promise.resolve({
            type: EkiResultType.SUCCESS,
            result: {
                ...resultBase,
                type: resultType,
            },
        });
    }
}
