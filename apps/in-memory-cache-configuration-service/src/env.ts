import { config } from 'dotenv';
import { CacheReplacementPolicyType } from './types/types';

config();

export const env = {
    ENVIRONMENT: process.env.NODE_ENV,
    CACHE_REPLACEMENT_POLICY: process.env.CACHE_REPLACEMENT_POLICY as CacheReplacementPolicyType,
    PORT: process.env.PORT ?? "3000",
    MAX_MEMORY_SIZE_MB: Number.parseInt(process.env.MAX_MEMORY_SIZE_MB ?? "10"),
    MAX_NUMBER_OF_ELEMENTS: Number.parseInt(process.env.MAX_NUMBER_OF_ELEMENTS ?? "100000")
}