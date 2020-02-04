import { Request, Response } from "express";
import { DmlService } from "../services/dmlService";
import { lstCRUD, iExecResult, iGetParams, retError, retResult } from "../utils";
import App from "../app";

export abstract class Controller<T> {
  protected srv: DmlService<T>;
  protected main: App;
  constructor(main: App, srv: DmlService<T>) {
    this.main = main;
    this.srv = srv;
  }

  protected async runDml(req: Request, res: Response, crudType: lstCRUD) {
    let result: iExecResult={};
    let resEntity: T;
    let reqEntity: T = <T>req.body;
    let resEntities: Array<T> = new Array<T>();
    result.request = <string>req.body;
    try {
      let getParams: iGetParams = {};
      console.log({ operation: crudType });
      getParams.id = req.params["id"];
      getParams.filter = req.query["filter"];
      getParams.limit = req.query["limit"];
      this.srv.init(this.main, getParams);
      switch (crudType) {
        case lstCRUD.Create:
          result = this.srv.add(reqEntity);
          resEntity = result.result;
          res.status(result.code).json(resEntity);
          break;
        case lstCRUD.Delete:
          this.srv.delete(getParams.id);
          res.status(200);
          break;
        case lstCRUD.Update:
          result = this.srv.update(reqEntity, getParams.id);
          resEntity = result.result;
          res.status(result.code).json(resEntity);
          break;
        case lstCRUD.Read:
          resEntities = this.srv.get(getParams);
          res.status(200).json(resEntities);
          break;
      }
    } catch (error) {
      result = retError(error, 500, req.body);
      res.status(result.code).json(result);
    }
  }

  protected mapRoutesToEntity(entityName: string) {
    this.main.expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    this.main.expApp
      .route("/" + entityName)
      .get(async (req: Request, res: Response) => {
        this.runDml(req, res, lstCRUD.Read);
      })
      .post(async (req: Request, res: Response) => {
        this.runDml(req, res, lstCRUD.Create);
      });

    this.main.expApp
      .route("/" + entityName + "/:id")
      .get((req: Request, res: Response) => this.runDml(req, res, lstCRUD.Read))
      .put((req: Request, res: Response) =>
        this.runDml(req, res, lstCRUD.Update)
      )
      .delete((req: Request, res: Response) =>
        this.runDml(req, res, lstCRUD.Delete)
      );
  }
}
