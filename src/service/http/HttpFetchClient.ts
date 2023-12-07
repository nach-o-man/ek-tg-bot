import { HttpClient } from './HttpClient.ts';

export class HttpFetchClient implements HttpClient {
    constructor(
        private readonly apiKey: string,
        private readonly baseUrl: string,
    ) {}

    public async get<T>(path: string): Promise<T> {
        const url = `${this.baseUrl}${path}`;

        console.log(`Fetching ${url}`);

        const result = await fetch(url, {
            method: 'GET',
            headers: this.getHeaders(),
        });

        if (result.ok) {
            return (await result.json());
        }

        return Promise.reject('Unable to reach API endpoint');
    }

    private getHeaders() {
        return { 'ekilex-api-key': this.apiKey };
    }
}
