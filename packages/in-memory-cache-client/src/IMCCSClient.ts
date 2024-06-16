// client.js
import * as net from 'node:net';
import { v4 as uuidV4 } from 'uuid';
import { getUsageData } from './utils';

export class IMCCSClient {
  port: number;
  host: string;
  serverPort: number;
  serverHost: string;
  requests: Map<any, any>;
  client: net.Socket;
  interval: NodeJS.Timeout;

  constructor(port: number, host: string, serverPort: number, serverHost: string) {
    this.port = port;
    this.host = host;
    this.serverPort = serverPort;
    this.serverHost = serverHost;
    this.requests = new Map();
    this.client = net.createConnection({ port, host }, () => {
      console.log('Connected to server');
    });

    this.client.on('end', () => {
      console.log('Disconnected from server');
    });

    this.client.on('error', (err) => {
      console.error('Error:', err);
    });

    this.interval = setInterval(() => {
      const dataUsage: any = getUsageData();
      dataUsage["port"] = serverPort;
      dataUsage['host'] = serverHost;
    }, 3_000);
  }



  async _sendRequest(message: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const id = uuidV4();
      this.requests.set(id, { resolve, reject });
      this.client.write(`${id}:${message}`);
    });
  }
}
