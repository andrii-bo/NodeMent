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
    private static connection: Connection;
    private type: 'postgres' | 'mysql' | 'mssql';
    private host: string;
    private port: number;
    private username: string;
    private password: string;
    private database: string;
    private ssl: boolean = false;
    private creds:DatabaseCredentials;

    constructor(databaseCredentials:DatabaseCredentials) {
        this.creds=databaseCredentials;
    }

    public async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }
        const { type, host, port, username, password, database, ssl } = this.creds;
        DatabaseProvider.connection = await createConnection({
            type, host, port, username, password, database,
            extra: {
                ssl
            }, 
            entities: [
                TUser
            ],
            autoSchemaSync: true
        } as any);

        return DatabaseProvider.connection;
    }
}
