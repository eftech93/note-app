export interface ICache{
    put(key: string, value: string, ttl?: number): void;
    get(key: string): string | undefined;
    delete(key: string): void;
    size(): number;
    toString(): string;
}