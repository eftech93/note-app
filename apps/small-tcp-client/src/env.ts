import { config } from 'dotenv';

config();

export const env = {
    ENVIRONMENT: process.env.NODE_ENV,
    PORT: process.env.PORT ?? "3000"
}