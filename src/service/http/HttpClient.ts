export interface HttpClient {
    get<T>(path: string): Promise<T>;
}

export interface HttpHtmlClient {
    get(path: string): Promise<string>;
}
