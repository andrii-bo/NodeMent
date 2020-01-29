import { Connection, createConnection } from 'typeorm';
import { TUser } from '../models/userMdl';

export interface DatabaseCredentials {
    type: 'postgres' | 'mysql' | 'mssql';
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    ssl?: boolean;
} ;

export class DatabaseProvider {
    private connection: Connection;
    private creds:DatabaseCredentials;

    constructor(databaseCredentials:DatabaseCredentials) {
        this.creds=databaseCredentials;        
    }

    public async getConnection(): Promise<Connection> {
        if (this.connection) {
            return this.connection;
        }
        const { type, host, port, username, password, database, ssl } = this.creds;
        this.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
            }, 
            entities: [
                TUser
            ],
            autoSchemaSync: true
        } as any);

        return this.connection;
    }
}
