import * as express from "express";
import { myClassRoutes } from "./classRoutes";
import { myClassUserController } from "./classUserController";

export default class myClassApp {
  private myRoutes: myClassRoutes = new myClassRoutes();
  private myExprApp: express.Application = express();
  private myUserController: myClassUserController;
  public serverStart(pPort: number) {
    this.myExprApp.listen(pPort, () => {
      console.log("  Press CTRL-C to stop\n");
    });
  }

  constructor() {
    this.myExprApp.use(express.json());
    this.myExprApp.use(express.urlencoded({ extended: true }));
    this.myRoutes.processRoutes(this.myExprApp);
  }
}
//TypeScript-Node-Starter-master  - test
//0_rest-api-node-typescript-master