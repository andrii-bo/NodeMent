import express from "express";
import { Request, Response } from "express";
import { ControllersSet } from './controllers/controllersSet';

export default class App {
  private curRequest: Request;
  private curResponse: Response;
  private controllersSet: ControllersSet;

  public expApp: express.Application = express();
  public serverStart(pPort: number) {
    this.expApp.listen(pPort, () => {
      console.log("  Press CTRL-C to stop\n");
    });
  }
  constructor() {

    this.expApp.use(express.json());
    this.expApp.use(express.urlencoded({ extended: true }));
    this.expApp.use((req, res, next) => {
      this.curRequest = req;
      next();
    });
    this.controllersSet = new ControllersSet(this.expApp);
  }
}
