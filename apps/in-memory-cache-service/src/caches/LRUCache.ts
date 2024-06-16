import { roughSizeOfObject } from "../utils/utils";
import { ICache } from "./ICache";

export class LRUCache implements ICache{

    cache: Map<string, [string, number | undefined]>;
    maxSizeInMB: number = 100;

    constructor(){
        this.cache = new Map<string, [string, number | undefined]>();
    }

    put(key: string, value: string, ttl?: number): void {
        this.cache.delete(key);
        this.cache.set(key, [value, ttl]);
    }

    get(key: string): string | undefined {
        if(!this.cache.has(key) || !this.cache.get(key)){
            return undefined;
        }
        const value: [string, number | undefined]| undefined= this.cache.get(key);

        this.cache.delete(key);

        if(!value){
            return undefined;
        }

        this.cache.set(key, value);

        return value[0];
    }

    delete(key: string): void {
        if(!this.cache.has(key)){
            return;
        }
        this.cache.delete(key);
    }

    toString(): string {
        throw new Error("Method not implemented.");
    }

    size(): number {
        return roughSizeOfObject(this.cache);
    }
}