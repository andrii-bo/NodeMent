import express from "express";
import { Request, Response } from "express";
import { myClassUserController } from "./classUserController";
import { handleError, lstCRUD } from "./utils";

export default class myClassApp {
  private curRequest: Request;
  private curResponse: Response;
  public expApp: express.Application = express();
  private userController: myClassUserController = new myClassUserController();
  public serverStart(pPort: number) {
    this.expApp.listen(pPort, () => {
      console.log("  Press CTRL-C to stop\n");
    });
  }

  public processRoutes(): void {
    this.expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    this.expApp
      .route("/user")
      .get((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Read)
      )
      .post((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Create)
      );

      this.expApp
      .route("/user/:id")
      .get((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Read)
      )
      .put((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Update)
      )
      .delete((req: Request, res: Response) =>
        this.userController.dmlUser(req, res, lstCRUD.Delete)
      );

  }

  constructor() {
    try {
      this.expApp.use(express.json());
      this.expApp.use(express.urlencoded({ extended: true }));
      this.expApp.use((req, res, next) => {
        this.curRequest = req;
        next();
      });
      this.processRoutes();
    } catch (error) {
      this.curResponse.send(handleError(error, "500", this.curRequest.body));
    }
  }
}
//TypeScript-Node-Starter-master  - test
//0_rest-api-node-typescript-master
