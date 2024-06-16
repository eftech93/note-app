import * as net from 'node:net';
import { env } from './env';
import { CacheFactory } from './caches/CacheFactory';
import { MCCSHBClient, getUsageData } from '@repo/in-memory-cache-client';

const cache = CacheFactory.createInstance(env.CACHE_REPLACEMENT_POLICY);
const server = net.createServer((socket: net.Socket) => {
    // Create cache Mechanism

    socket.addListener('data', (data: Buffer) => {
        // transform buffer to string

        const dataAsString = data.toString();
        const [requestId, ...requestContent] = dataAsString.split(":");
        const dataAsJson = JSON.parse(requestContent.join(":"));
        if (!dataAsJson['action'] || !['put', 'get', 'delete'].includes(dataAsJson['action'])) {
            return socket.write('error');
        }

        const action: 'put' | 'get' | 'delete' | 'hb' = dataAsJson['action'];
        const { key, ttl, value } = dataAsJson;

        switch (action) {
            case 'delete':
                cache.delete('key');
                socket.write(`${requestId}:`)
                break;
            case 'put':
                cache.put(key, value ?? '', ttl);
                socket.write(`${requestId}:`)
                console.log(cache.size())
                break;
            case 'get':
                const val = cache.get(key);
                socket.write(`${requestId}:${val}`)
                break;
            case 'hb':
                socket.write(`${requestId}:ok`)
                break;
        }
    });
});

server.listen(Number.parseInt(env.PORT), () => {
    console.log('Listening to port', env.PORT)
});

const configurationServiceClient = new MCCSHBClient(3020, 'localhost', Number.parseInt(env.PORT ?? "3010"), 'localhost')