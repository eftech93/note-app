// client.js
import * as net from 'node:net';
import { v4 as uuidV4 } from 'uuid';
import { getUsageData } from './utils';

export class MCCSHBClient {
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
      console.log("Send HB")
      const dataUsage: any = getUsageData();
      dataUsage["port"] = serverPort;
      dataUsage['host'] = serverHost;
      dataUsage['action'] = "hb";
      this.client.write(`${uuidV4()}:${JSON.stringify(dataUsage)}`);
    }, 3_000);
  }
}
