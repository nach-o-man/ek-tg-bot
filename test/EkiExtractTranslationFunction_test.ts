import { assertEquals } from 'https://deno.land/std@0.207.0/assert/mod.ts';
import {
    EkiExtractTranslationFunction,
    EkiTranslation,
} from '../src/service/function/EkiExtractTranslationFunction.ts';
import { EkiLanguage } from '../src/types/EkiLanguage.ts';

Deno.test('EkiExtractTranslationFunction test ', async () => {
    const text = await Deno.readTextFile(
        'test/data/est_word_details_speak.json',
    );
    const result = await new EkiExtractTranslationFunction().extractTranslation(
        JSON.parse(text),
        EkiLanguage.RUS,
    );
    const expected: EkiTranslation[] = [
        {
            id: 305363,
            value: 'сказать',
        },
        {
            id: 323667,
            value: 'произнести',
        },
        {
            id: 311197,
            value: 'промолвить',
        },
        {
            id: 473327,
            value: 'проговорить',
        },
        {
            id: 351777,
            value: 'заметить',
        },
        {
            id: 303963,
            value: 'говорить',
        },
        {
            id: 343286,
            value: 'подсказать',
        },
        {
            id: 294819,
            value: 'подсказывать',
        },
        {
            id: 510101,
            value: 'скажем',
        },
    ];
    assertEquals(result, expected);
});
