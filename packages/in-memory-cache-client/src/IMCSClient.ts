// client.js
import * as net from 'node:net';
import { v4 as uuidV4 } from 'uuid';

export class IMCSClient {
  port: number;
  host: string;
  requests: Map<any, any>;
  client: net.Socket;
  constructor(port: number, host: string) {
    this.port = port;
    this.host = host;
    this.requests = new Map();
    this.client = net.createConnection({ port, host }, () => {
      console.log('Connected to server');
    });

    this.client.on('data', (data) => {
      const message = data.toString();
      console.log('Received:', message);

      // Assuming the message format is 'id:response'
      const [id, response] = message.split(':');
      const { resolve, reject } = this.requests.get(id) || {};
      if (resolve) {
        resolve(response);
        this.requests.delete(id);
      }
    });

    this.client.on('end', () => {
      console.log('Disconnected from server');
    });

    this.client.on('error', (err) => {
      console.error('Error:', err);
    });
  }

  async put(key: string, value: string, ttl?: number): Promise<void>{
    await this._sendRequest(JSON.stringify({ action: 'put', key, value }));
  }

  async get(key: string): Promise<string | undefined>{
    const response = await this._sendRequest(JSON.stringify({ action: 'get', key }));
    return response === 'undefined'? undefined : response;
  }

  async _sendRequest(message: string): Promise<string | undefined> {
    return new Promise((resolve, reject) => {
      const id = uuidV4();
      this.requests.set(id, { resolve, reject });
      this.client.write(`${id}:${message}`);
    });
  }
}
