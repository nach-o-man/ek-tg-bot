export interface EkiWordSearch {
    totalCount: number;
    words: EkiWord[];
}

export type EkiWord = {
    wordId: number;
    wordValue: string;
    lang: string;
};

export type EkiWordDetails = {
    word: EkiWord;
    paradigms: EkiWordParadigm[];
    lexemes: EkiWordLexeme[];
};

export type EkiWordParadigm = {
    forms: EkiWordForm[];
};

export type EkiWordForm = {
    value: string;
    morphCode: string;
};

export type EkiWordLexeme = {
    synonymLangGroups: EkiWordLexemeSynonymLangGroup[];
};

export type EkiWordSimple = Pick<EkiWord, 'wordId' | 'wordValue'>;

export type EkiWordSynonim = EkiWordSimple & { lexemePublic: boolean };

export type EkiWordLexemeSynonymLangGroup = {
    lang: EkiWord['lang'];
    synonyms: {
        type: string;
        words: EkiWordSynonim[];
    }[];
};
