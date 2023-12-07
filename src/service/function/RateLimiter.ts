import { CurrentTimestampFunction } from './CurrentTimestampFunction.ts';

export interface RateLimiter {
    requestToken(): boolean;
}

export class SimpleRateLimiter implements RateLimiter {
    private tokens: number;
    private lastRefill: number;

    constructor(
        private readonly refillRate: number,
        private readonly maxTokens: number,
        private readonly currentTimestampFunction: CurrentTimestampFunction,
    ) {
        this.tokens = maxTokens;
        this.lastRefill = currentTimestampFunction.getCurrentTimestamp();
    }

    private refillTokens(): void {
        const now = this.currentTimestampFunction.getCurrentTimestamp();
        const secondsPassed = now - this.lastRefill;

        this.tokens = Math.min(
            this.tokens + this.refillRate * secondsPassed,
            this.maxTokens,
        );
        this.lastRefill = now;
    }

    public requestToken(): boolean {
        this.refillTokens();
        if (this.tokens > 0) {
            this.tokens--;
            return true;
        }
        return false;
    }
}
