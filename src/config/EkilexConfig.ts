import { EkiLanguage } from '../types/EkiLanguage.ts';

export type EkilexConfig = {
    apiKey: string | null;
    foreignLanguage: EkiLanguage;
};
