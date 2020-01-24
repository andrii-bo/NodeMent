import express from "express";
import { Request, Response } from "express";
import { handleError, lstCRUD } from "./utils";
import {CONTROLLERS} from './controllers/index';

export default class myClassApp {
  private curRequest: Request;
  private curResponse: Response;
  public expApp: express.Application = express();
  public serverStart(pPort: number) {
    this.expApp.listen(pPort, () => {
      console.log("  Press CTRL-C to stop\n");
    });
  }

    constructor() {
    try {
      this.expApp.use(express.json());
      this.expApp.use(express.urlencoded({ extended: true }));
      this.expApp.use((req, res, next) => {
        this.curRequest = req;
        next();
      });
      CONTROLLERS.forEach(controller => controller.initialize(this.expApp));
    } catch (error) {
      this.curResponse.send(handleError(error, "500", this.curRequest.body));
    }
  }
}
//TypeScript-Node-Starter-master  - test
//0_rest-api-node-typescript-master
