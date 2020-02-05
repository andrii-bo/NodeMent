import express from "express";
import { Request, Response } from "express";
import { DmlService } from "../services/dmlService";
import { lstCRUD, iExecResult, iGetParams, retError, retResult } from "../utils";
import App from "../app";

export class Controller<T> {
  protected srv: DmlService<T>;
  constructor(expApp: express.Application, srv: DmlService<T>, entityName: string) {
    this.srv = srv;
    this.mapRoutesToEntity(entityName, expApp);    
  }

  protected async runDml(req: Request, res: Response, crudType: lstCRUD) {
    let result: iExecResult = {};
    let resEntity: T;
    let resEntities: Array<T> = new Array<T>();
    result.request = <string>req.body;
    try {
      let getParams: iGetParams = {};
      getParams.id = req.params["id"];
      getParams.filter = req.query["filter"];
      getParams.limit = req.query["limit"];
      getParams.entity=<T>req.body;
      getParams.crudOp=crudType;

      console.log(getParams);

      switch (crudType) {
        case lstCRUD.Create:
          result = this.srv.merge(getParams);
          resEntity = result.result;
          res.status(result.code).json(resEntity);
          break;
        case lstCRUD.Delete:
          this.srv.delete(getParams.id);
          res.status(200);
          break;
        case lstCRUD.Update:
          result = this.srv.merge(getParams);
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

  protected mapRoutesToEntity(entityName: string, expApp: express.Application) {
    expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfull!" });
    });

    expApp
      .route("/" + entityName)
      .get(async (req: Request, res: Response) => {
        this.runDml(req, res, lstCRUD.Read);
      })
      .post(async (req: Request, res: Response) => {
        this.runDml(req, res, lstCRUD.Create);
      });

    expApp
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
