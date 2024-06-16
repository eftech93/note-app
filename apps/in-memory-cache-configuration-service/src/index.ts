import * as net from 'node:net';
import { env } from './env';
import { Mutex } from 'async-mutex';

type Status = 'ok' | 'degradated';
type HeartBeatData = [Status, string, Date];
const dataAccessMutex = new Mutex();
// create in-cache-memory-servers data 
const map = new Map<string, HeartBeatData>(); // key is host: port, [status, json, last update]
// keep only latest data
const server = net.createServer((socket: net.Socket) => {

    async function handleHB(requestId: string, dataAsJson: any) {
        const release = await dataAccessMutex.acquire();
        try {
            const { host, port, rss, heapTotal, heapUsed, external, arrayBuffers, cacheSize, ...rest } = dataAsJson;
            map.set(`${host}:${port}`, ['ok', JSON.stringify(dataAsJson), new Date()]);
        } catch (e) {
            // Error
        } finally {
            release();
        }
    }

    socket.addListener('data', (data: Buffer) => {
        const dataAsString = data.toString();

        const [requestId, ...requestContent] = dataAsString.split(":");
        const dataAsJson = JSON.parse(requestContent.join(":"));

        if (!dataAsJson['action'] || !['hb', 'status'].includes(dataAsJson['action'])) {
            return socket.write('error');
        }

        const action: 'status' | 'hb' = dataAsJson['action'];
        if (action === 'hb') {
            handleHB(requestId, dataAsJson);
        }else if(action === 'status'){
            const serverStatus: any = {};
            for(const key of map.keys()){
                const [status] = map.get(key) as HeartBeatData;
                serverStatus[key] = status;
            }
            socket.write(`${requestId}:${JSON.stringify(serverStatus)}`);
        }
    });
});

server.listen(Number.parseInt(env.PORT), () => {
    console.log('Listening to port', env.PORT)
});

setInterval(async () => {
    console.log('verifying hbs', new Date())
    const release = await dataAccessMutex.acquire();
    console.log(map);
    try{
        for(const key of map.keys()){
            const [status, _, lastDate] = map.get(key) as HeartBeatData;
            const differenceInSeconds = (- lastDate.getTime() + new Date().getTime()) / 1_000;
            console.log(`diffInSeconds: ${differenceInSeconds}`)
            if(status === 'ok' && differenceInSeconds >= 5){
                map.set(key, ['degradated', _, lastDate]);
            }
        }
    }catch(e){
        // 
    }finally{
        release();
    }
}, 5_000);