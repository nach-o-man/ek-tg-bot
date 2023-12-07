export interface CurrentTimestampFunction {
    getCurrentTimestamp(): number;
}

export class SimpleCurrentTimestampFunction implements CurrentTimestampFunction {
    public getCurrentTimestamp(): number {
        return Date.now() / 1000;
    }
}
