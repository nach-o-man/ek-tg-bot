import { DOMParser } from 'deno-dom';

export class SonaveebWordFormFunction {
    public extractWordForms(input: string): SonaveebWordForms {
        const wordForms: Set<string> = new Set();
        const doc = new DOMParser().parseFromString(input, 'text/html');

        if (!doc) {
            return { wordForms: new Set() };
        }

        doc.querySelectorAll('button.word-form').forEach((node) => {
            const wordForm = node.textContent;
            if (wordForm) {
                wordForms.add(wordForm);
            }
        });

        return {
            wordForms: wordForms,
        };
    }
}

export type SonaveebWordForms = {
    wordForms: Set<string>;
};
