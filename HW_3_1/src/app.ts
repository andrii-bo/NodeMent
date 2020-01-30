import express from "express";
import { Request, Response } from "express";
import { ControllersSet } from "./controllers/controllersSet";
import { DatabaseProvider, DatabaseCredentials } from "./database/index";

export default class App {
  private curRequest: Request;
  private curResponse: Response;
  private controllersSet: ControllersSet;
  public db: DatabaseProvider;
  public expApp: express.Application = express();
  public port: number;
  public async serverStart() {
    await this.db.connect().then(() => {
      if (this.db.connectionStatus.code === 200) {
        console.log("  Connected to database " + this.db.connection);
        this.expApp.listen(this.port, () => {
          console.log("  Press CTRL-C to stop\n");
        });
      } else {
        console.log("ERROR  Can't connect to database " + this.db.connectionStatus.message);
        this.expApp.listen(this.port, () => {
          console.log(" Application run in memory storage mode, Press CTRL-C to stop\n");
        });
      }
    });
  }

  constructor(port: number, databaseCredentials: DatabaseCredentials) {
    this.expApp.use(express.json());
    this.expApp.use(express.urlencoded({ extended: true }));
    this.expApp.use((req, res, next) => {
      this.curRequest = req;
      next();
    });
    this.port = port;
    this.db = new DatabaseProvider(databaseCredentials);
    this.controllersSet = new ControllersSet(this);
  }
}
