import { Connection, createConnection } from "typeorm";
import { iExecResult, retResult, retError } from "../utils";

export class DatabaseProvider {
  public connection: Connection;
  public connectionStatus: iExecResult;
  public connectionName: string;

  constructor(connectionName: string) {
    this.connectionName = connectionName;
  }

  public async connect() {
    if (!this.connection) {
      await createConnection(this.connectionName)
        .then(connection => {
          this.connection = connection;
          this.connectionStatus = retResult(this.connection);
        })
        .catch(error => {
          this.connectionStatus = retError(502, error);
          console.log(error.stack);
        });
    }
  }
}
