import { CacheReplacementPolicyType } from "./types";

declare namespace NodeJS{
    interface ProcessEnv{
        NODE_ENV: 'development' | 'production' | 'test';
        CACHE_REPLACEMENT_POLICY: CacheReplacementPolicyType;
        PORT?: string;
        MAX_MEMORY_SIZE_MB?: string;
        MAX_NUMBER_OF_ELEMENTS?: string;
    }
}