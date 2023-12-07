import { wrapFetch } from 'another_cookiejar';
import { HttpHtmlClient } from './HttpClient.ts';
import { RateLimiter } from '../function/RateLimiter.ts';

export class SonaveebFetchClient implements HttpHtmlClient {
    constructor(private readonly rateLimiter: RateLimiter) {}

    private readonly baseUrl: string = 'https://sonaveeb.ee';

    private async getHtml(path: string): Promise<string> {
        const url = `${this.baseUrl}${path}`;
        const fetchWithCookies = wrapFetch({ fetch: fetch });

        console.log(url);

        const result = await fetchWithCookies(url, {
            method: 'GET',
            redirect: 'follow',
        });

        if (result.ok) {
            const html: string = await result.text();
            return html;
        }

        return Promise.reject('Unable to reach endpoint');
    }

    public async get(path: string): Promise<string> {
        if (!this.rateLimiter.requestToken()) {
            return Promise.reject('Rate limit exceeded');
        }

        return await this.getHtml(path);
    }
}
