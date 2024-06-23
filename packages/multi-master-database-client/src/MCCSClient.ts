// client.js
import * as net from 'node:net';
import { v4 as uuidV4 } from 'uuid';
import { getUsageData } from './utils';

export class MCCSLowClient {
  port: number;
  host: string;
  requests: Map<any, any>;
  client: net.Socket;
  ringClient: Map<string, net.Socket>;
  intervalRingRefresh: NodeJS.Timeout | undefined;

  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
    this.ringClient = new Map();
    this.requests = new Map();
    this.client = net.createConnection({ port, host }, () => {
      console.log('Connected to server');
      this.intervalRingRefresh = setInterval(() => {
        this.client.write("status")
      }, 60_000);
    });

    this.client.on('end', () => {
      console.log('Disconnected from server');
    });

    this.client.on('error', (err) => {
      console.error('Error:', err);
    });
  }


}
