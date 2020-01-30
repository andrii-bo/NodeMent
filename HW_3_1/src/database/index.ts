import { Connection, createConnection } from "typeorm";
import { TUser } from "../models/userMdl";
import { iExecResult, retResult, retError } from "../utils";

export interface DatabaseCredentials {
  type: "postgres" | "mysql" | "mssql";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  ssl?: boolean;
}

export class DatabaseProvider {
  public connection: Connection;
  public connectionStatus: iExecResult;
  private creds: DatabaseCredentials;

  constructor(databaseCredentials: DatabaseCredentials) {
    this.creds = databaseCredentials;
  }

  public async connect() {
    if (!this.connection) {
      await createConnection({
        type: this.creds.type,
        host: this.creds.host,
        port: this.creds.port,
        username: this.creds.username,
        password: this.creds.password,
        database: this.creds.database
      })
        .then(connection => {
          this.connection = connection;
          this.connectionStatus = retResult(this.connection);
        })
        .catch(error => {
          this.connectionStatus = retError(502, error);
        });
    }
  }
}
