import { ConnectionClient } from "./Connection";

export type Configuration = { user: string, host: string, password: string }

export class DBBuilder{
    masters: ConnectionClient[] = [];
    replicas: ConnectionClient[] = [];
    configs: Map<'master' | 'replica', Configuration[]> = new Map();

    withMasterConfig(config: Configuration): DBBuilder {
        const arr = this.configs.get('master') ?? [];
        arr.push(config);
        this.configs.set('master', arr);
        return this;
    }

    withReplicaConfig(config: Configuration): DBBuilder {
        const arr = this.configs.get('replica') ?? [];
        arr.push(config);
        this.configs.set('replica', arr);
        return this;
    }

    build(){

    }
}