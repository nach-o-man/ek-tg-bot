import { EkiWordDetails } from '../../types/EkiWord.ts';
import { HttpClient } from '../http/HttpClient.ts';

export class EkiWordDetailsService {
    constructor(private readonly client: HttpClient) {}

    public details(wordId: number): Promise<EkiWordDetails> {
        const encodedWordId = encodeURIComponent(wordId);
        const endpointPath = `/word/details/${encodedWordId}/eki`;
        return this.client.get<EkiWordDetails>(endpointPath);
    }
}
