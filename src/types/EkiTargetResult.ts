import { EkiTranslation } from '../service/function/EkiExtractTranslationFunction.ts';
import { EkiWord } from './EkiWord.ts';

export type EkiTargetResult =
    | EkiTargetServiceResultSuccess
    | EkiTargetServiceResultError;

export type EkiTargetServiceResultError = {
    type: EkiResultType.ERROR;
    error: string;
};

export type EkiTargetServiceResultSuccess = {
    type: EkiResultType.SUCCESS;
    result: EkiTargetResultSuccess;
};

export type EkiTargetResultSuccess =
    | EkiTargetServiceResultSuccessEstonian
    | EkiTargetServiceResultSuccessNonEstonian
    | EkiTargetServiceResultSuccessOtherForm;

export interface EkiTargetServiceResultSuccessBase {
    type: EkiSuccessResultType;
    word: EkiWord['wordValue'];
    translations: EkiTranslation[];
}

export interface EkiTargetServiceResultSuccessOtherForm {
    type: EkiSuccessResultType.OTHER_FORM;
    forms: string[];
}

export interface EkiTargetServiceResultSuccessEstonian
    extends EkiTargetServiceResultSuccessBase {
    type: EkiSuccessResultType.ESTONIAN;
    forms: { [form: string]: string };
    otherForms: string[];
}

export interface EkiTargetServiceResultSuccessNonEstonian
    extends EkiTargetServiceResultSuccessBase {
    type: EkiSuccessResultType.NON_ESTONIAN;
}

export enum EkiResultType {
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export enum EkiSuccessResultType {
    ESTONIAN = 'ESTONIAN',
    OTHER_FORM = 'OTHER_FORM',
    ERROR = 'ERROR',
    NON_ESTONIAN = 'NON_ESTONIAN',
}
