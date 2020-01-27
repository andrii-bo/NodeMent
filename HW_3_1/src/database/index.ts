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

    constructor(databaseCredentials:DatabaseCredentials) {
        this.type = type;
        this.host = host;
        this.port = port;
        this.username = username;
        this.password = password
        this.database = database;
        this.ssl = ssl;
    }

    public async getConnection(): Promise<Connection> {
        if (DatabaseProvider.connection) {
            return DatabaseProvider.connection;
        }

        DatabaseProvider.connection = await createConnection({
            type: this.type, host: this.host, port: this.port, username: this.username, password: this.password, database: this.database,
            extra: {
                ssl: this.ssl
            },
            entities: [
                TUser
            ],
            autoSchemaSync: true
        } as any);

        return DatabaseProvider.connection;
    }
}
