import { CacheReplacementPolicyType } from "../types/types";
import { ICache } from "./ICache";
import { LRUCache } from "./LRUCache";

export class CacheFactory{
    static createInstance(cacheType: CacheReplacementPolicyType): ICache{
        switch(cacheType){
            case 'lfu': 
                return new LRUCache();
                break
        }
        return new LRUCache();
    }
}