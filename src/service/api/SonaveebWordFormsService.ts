import { SonaveebFetchClient } from '../http/SonaveebFetchClient.ts';
import {
    SonaveebWordFormFunction,
    SonaveebWordForms,
} from '../function/SonaveebWordFormFunction.ts';

export class SonaveebWordFormsService {
    constructor(
        private readonly client: SonaveebFetchClient,
        private readonly sonaveebWordFormFunction: SonaveebWordFormFunction,
    ) {
    }

    public async search(word: string): Promise<SonaveebWordForms> {
        const encodedWord = encodeURIComponent(word);
        const endpointPath = `/search/unif/dlall/eki/${encodedWord}/1`;
        const html = await this.client.get(endpointPath);

        return this.sonaveebWordFormFunction.extractWordForms(html);
    }
}
