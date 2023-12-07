import { HttpClient } from '../http/HttpClient.ts';
import { EkiWordSearch } from '../../types/EkiWord.ts';

export class EkiWordSearchService {
    constructor(private readonly client: HttpClient) {}

    public search(word: string): Promise<EkiWordSearch> {
        const encodedWord = encodeURIComponent(word);
        const endpointPath = `/word/search/${encodedWord}/eki`;
        return this.client.get<EkiWordSearch>(endpointPath);
    }
}
