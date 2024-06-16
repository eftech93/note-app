import { env } from './env';
import { IMCSClient } from '@repo/in-memory-cache-client';

// Example usage
const client = new IMCSClient(Number.parseInt(env.PORT), "localhost");

async function makeRequests() {
    
    for (let i = 0; i < 10_000; i++) {
        try {
            const r1 = { action: 'put', key: `${i}-test-key`, value: 'hellow-world' }
            await client.put(r1.key, r1.value);
            // console.log('Server response to query:', response1);

            // const r2 = { action: 'get', key: 'test-key'}
            // const response2 = await client.get(r2.key);
            // console.log('Server response to query:', response2);

            // const r3 = { action: 'get', key: 'test-key1'}
            // const response3 = await client.get(r3.key);

            // console.log('Server response to query:', response3);
        } catch (error) {
            console.error('Error making requests:', error);
        }
    }

    
}

makeRequests();
