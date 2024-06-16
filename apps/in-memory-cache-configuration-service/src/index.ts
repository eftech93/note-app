import * as net from 'node:net';
import { env } from './env';

// keep only latest data
const server = net.createServer((socket: net.Socket) => {
    // Create cache Mechanism
    const map = new Map<string, [string, Date]>(); // key is host: port, [json, last update]

    socket.addListener('data', (data: Buffer) => {
        const dataAsString = data.toString();

        const [requestId, ...requestContent] = dataAsString.split(":");
        const dataAsJson = JSON.parse(requestContent.join(":"));

        if(!dataAsJson['action'] || !['hb', 'status'].includes(dataAsJson['action'])){
            return socket.write('error');
        }

        const action: 'status' | 'hb' = dataAsJson['action'];
        if(action === 'hb'){
            const {host, rss, heapTotal, heapUsed, external, arrayBuffers, cacheSize} = dataAsJson;
        }
        
    });
});

server.listen(Number.parseInt(env.PORT),  () => {
    console.log('Listening to port', env.PORT)
})