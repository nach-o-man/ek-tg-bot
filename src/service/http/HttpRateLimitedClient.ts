import { HttpClient } from './HttpClient.ts';
import { RateLimiter } from '../function/RateLimiter.ts';

export class HttpRateLimitedClient implements HttpClient {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly rateLimiter: RateLimiter,
    ) {
    }

    public get<T>(path: string): Promise<T> {
        if (!this.rateLimiter.requestToken()) {
            return Promise.reject('Rate limit exceeded');
        }

        return this.httpClient.get<T>(path);
    }
}
