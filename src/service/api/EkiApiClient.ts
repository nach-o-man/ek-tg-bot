import { EkilexConfig } from '../../config/EkilexConfig.ts';
import { HttpFetchClient } from '../http/HttpFetchClient.ts';
import { EkiWordDetailsService } from './EkiWordDetailsService.ts';
import { EkiWordSearchService } from './EkiWordSearchService.ts';
import { HttpRateLimitedClient } from '../http/HttpRateLimitedClient.ts';
import { EkiLanguage } from '../../types/EkiLanguage.ts';
import { RateLimiter } from '../function/RateLimiter.ts';

export class EkiApiClient {
    private readonly ekiWordDetailsService: EkiWordDetailsService;
    private readonly ekiWordSearchService: EkiWordSearchService;
    private readonly foreignLanguage: EkiLanguage;

    constructor(ekilexConfig: EkilexConfig, rateLimiter: RateLimiter) {
        const httpFetchClient = new HttpRateLimitedClient(
            new HttpFetchClient(
                this.assertApiKey(ekilexConfig),
                'https://ekilex.ee/api',
            ),
            rateLimiter,
        );

        this.foreignLanguage = ekilexConfig.foreignLanguage;
        this.ekiWordDetailsService = new EkiWordDetailsService(httpFetchClient);
        this.ekiWordSearchService = new EkiWordSearchService(httpFetchClient);
    }

    public getForeignLanuage(): EkiLanguage {
        return this.foreignLanguage;
    }

    public getWordDetailsService(): EkiWordDetailsService {
        return this.ekiWordDetailsService;
    }

    public getWordSearchService(): EkiWordSearchService {
        return this.ekiWordSearchService;
    }

    private assertApiKey(ekilexConfig: EkilexConfig): string {
        if (!ekilexConfig.apiKey) {
            throw new Error('Missing API key');
        }
        return ekilexConfig.apiKey;
    }
}
