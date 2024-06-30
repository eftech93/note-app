import { config } from 'dotenv';
import { CacheReplacementPolicyType } from './types/env';

config();

export const env = {
    ENVIRONMENT: process.env.NODE_ENV,
    CACHE_REPLACEMENT_POLICY: process.env.CACHE_REPLACEMENT_POLICY as CacheReplacementPolicyType,
    PORT: Number.parseInt(process.env.PORT ?? "3000"),
    MAX_MEMORY_SIZE_MB: Number.parseInt(process.env.MAX_MEMORY_SIZE_MB ?? "10"),
    MAX_NUMBER_OF_ELEMENTS: Number.parseInt(process.env.MAX_NUMBER_OF_ELEMENTS ?? "100000"),
    CONFIG_SERVICE_HOST: process.env.CONFIG_SERVICE_HOST ?? 'localhost',
    CONFIG_SERVICE_PORT: Number.parseInt(process.env.CONFIG_SERVICE_PORT ?? "6000"),
    SERVICE_NAME: process.env.SERVICE_NAME,
    REPLICA_INDEX: process.env.HOSTNAME ?? '1'
}