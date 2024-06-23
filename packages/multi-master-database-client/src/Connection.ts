import * as mysql from 'mysql';


export class ConnectionClient{

    connection: mysql.Connection;

    constructor(host: string, user: string, password: string){
        this.connection = mysql.createConnection({host, user, password});
    }
}