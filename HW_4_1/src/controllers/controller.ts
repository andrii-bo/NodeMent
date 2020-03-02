import express from "express";
import { Request, Response } from "express";
import {
  lstCRUD,
  iExecResult,
  iGetParams,
  retError,
  print_info
} from "../utils";
import { Service } from "../services/service";

export class Controller {
  private srv: Service;
  constructor(expApp: express.Application, routeName: string, srv: Service) {
    this.srv = srv;
    this.mapRoutesToEntity(routeName, expApp);
  }

  private async runDml(req: Request, res: Response, crudType: lstCRUD): Promise<void> {
    let getParams: iGetParams = {};
    let dmlRes: iExecResult;
    getParams.id = req.params["id"];
    getParams.filter = req.query["filter"];
    getParams.limit = req.query["limit"];
    getParams.entity = req.body;
    getParams.crudOp = crudType;
    print_info(" input params", getParams);

    switch (crudType) {
      case lstCRUD.Delete:
        dmlRes = await this.srv.delete(getParams.id);
        break;
      case lstCRUD.Clear:
        dmlRes = await this.srv.clear();
        break;
      case lstCRUD.Update:
        dmlRes = await this.srv.merge(getParams);
        break;
      case lstCRUD.Read:
        dmlRes = await this.srv.get(getParams);
        break;
    }
    if (!(dmlRes.code === 200)) print_info("ERROR dml operation", dmlRes.result);
    res.status(dmlRes.code).json(dmlRes.result);
  }
  protected mapRoutesToEntity(routeName: string, expApp: express.Application) {

    expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfull!" });
    });

    expApp
      .route("/" + routeName)
      .get(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Read))
      .post(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Update));

    expApp
      .route("/" + routeName + "/:id")
      .get(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Read))
      .put(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Update))
      .delete(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Delete));

    expApp
      .route("/" + routeName)
      .delete(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Clear));

  }
}
