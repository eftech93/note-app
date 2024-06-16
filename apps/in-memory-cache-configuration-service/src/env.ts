import { config } from 'dotenv';
import { CacheReplacementPolicyType } from './types/types';

config();

export const env = {
    ENVIRONMENT: process.env.NODE_ENV,
    PORT: process.env.PORT ?? "3000"
}