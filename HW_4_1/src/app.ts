import express from "express";
import { Request, Response } from "express";
import { ControllersSet } from "./controllers/controllersSet";
import { DatabaseProvider } from "./database/index";

export default class App {
  private curRequest: Request;
  private curResponse: Response;
  private controllersSet: ControllersSet;
  public db: DatabaseProvider;
  public expApp: express.Application = express();
  public port: number;

  public async serverStart(): Promise<any> {
    let msg = "";
    await this.db
      .connect()
      .then(() => {
        if (this.db.connectionStatus.code === 200) {
          msg = "Database connected, server listening.  Press CTRL-C to stop\n";
        } else {
          msg =
            "ERROR  Can't connect to database " +
            this.db.connectionStatus.message;
        }
      })
      .catch(err => {
        console.log("DB ERROR CATCH", err.message);
      })
      .finally(() => {
        console.log("DB finally");
      });

    return new Promise(resolve => {
      this.expApp.listen(this.port, () => {
        console.log("app listen ", msg);
        resolve();
      });
    });
  }

  constructor(port: number, connectionName: string) {
    process
      .on("unhandledRejection", (reason, p) => {
        console.error(reason, " Unhandled !!! Rejection at Promise", p);
      })
      .on("uncaughtException", err => {
        console.error(err, " Uncaught !!! Exception thrown");
      });

    this.expApp.use(express.json());
    this.expApp.use(express.urlencoded({ extended: true }));
    this.expApp.use((req, res, next) => {
      this.curRequest = req;
      next();
    });
    this.port = port;
    this.db = new DatabaseProvider(connectionName);
    this.controllersSet = new ControllersSet(this);
  }
}
