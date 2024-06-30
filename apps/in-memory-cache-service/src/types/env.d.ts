
export type CacheReplacementPolicyType = 'lru' | 'lfu' | 'mru' | 'mfu';

declare namespace NodeJS{
    interface ProcessEnv{
        NODE_ENV: 'development' | 'production' | 'test';
        CACHE_REPLACEMENT_POLICY: CacheReplacementPolicyType;
        PORT?: string;
        MAX_MEMORY_SIZE_MB?: string;
        MAX_NUMBER_OF_ELEMENTS?: string;
        CONFIG_SERVICE_HOST?: string;
        CONFIG_SERVICE_PORT?: string;
        SERVICE_NAME?: string;
        HOSTINDEX?: string;
    }
}