import { Connection, createConnection } from "typeorm";

export class DatabaseProvider {
  public connection: Connection;
  public connectionStatus: string;
  public connected: boolean = false;
  public connectionName: string;

  constructor(connectionName: string) {
    this.connectionName = connectionName;
  }

  public async connect() {
    if (!this.connection) {
      await createConnection(this.connectionName)
        .then(connection => {
          this.connected = true;
          this.connection = connection;
          this.connectionStatus = "connected";
        })
        .catch(error => {
          this.connected = false;
          this.connectionStatus = error.message;
          console.log(error.stack);
        });
    }
  }
}
