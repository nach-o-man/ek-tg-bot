import { EkiWordDetails } from '../../types/EkiWord.ts';
import { EkiLanguage } from '../../types/EkiLanguage.ts';

export class EkiExtractTranslationFunction {
    public extractTranslation(
        ekiWordDetails: EkiWordDetails,
        foreignLanguage: EkiLanguage,
    ): Promise<EkiTranslation[]> {
        const targetLanguage = ekiWordDetails.word.lang == EkiLanguage.EST
            ? foreignLanguage
            : EkiLanguage.EST;
        const result: EkiTranslation[] = [];
        const wordIds: Set<number> = new Set();
        for (const lexeme of ekiWordDetails?.lexemes || []) {
            for (const synonymLangGroup of lexeme.synonymLangGroups || []) {
                if (synonymLangGroup.lang === targetLanguage) {
                    for (const synonym of synonymLangGroup.synonyms) {
                        if (synonym.type !== 'MEANING_WORD') {
                            continue;
                        }
                        for (const word of synonym.words) {
                            if (
                                word.lexemePublic && !wordIds.has(word.wordId)
                            ) {
                                wordIds.add(word.wordId);
                                result.push({
                                    id: word.wordId,
                                    value: word.wordValue,
                                });
                            }
                        }
                    }
                }
            }
        }

        return Promise.resolve(result);
    }
}

export type EkiTranslation = {
    id: EkiWordDetails['word']['wordId'];
    value: EkiWordDetails['word']['wordValue'];
};
