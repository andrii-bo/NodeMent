import express from "express";
import { Request, Response } from "express";
import { DmlService } from "../services/dmlService";
import { iEntity } from "../entity/Entity";
import { lstCRUD, iExecResult, iGetParams, retError } from "../utils";
import App from "../app";

export abstract class Controller {
  protected srv: DmlService;
  protected main: App;
  protected entity: iEntity = {};
  constructor(main: App, srv: DmlService) {
    this.main = main;
    this.srv = srv;
  }

  async runDml<T>(req: Request, res: Response, crudType: lstCRUD) {
    let result: iExecResult;
    let resEntity: iEntity;
    let resEntities: iEntity[];
    let execRes:iExecResult;          
    try {
      this.entity = <T>req.body;
      let getParams: iGetParams = {};
      console.log({ operation: crudType });
      getParams.id = req.params["id"];
      getParams.filter = req.query["filter"];
      getParams.limit = req.query["limit"];
      this.srv.init(getParams);
      switch (crudType) {
        case lstCRUD.Create:
          execRes=this.srv.add(this.entity);
          resEntity = <T>execRes.result;
          res.status(execRes.code).json(resEntity);
          break;
        case lstCRUD.Delete:
          this.srv.delete(getParams.id);
          res.status(200);
          break;
        case lstCRUD.Update:
          execRes = this.srv.update(this.entity, getParams.id);
          resEntity = <T>execRes.result;
          res.status(execRes.code).json(resEntity);
          break;
        case lstCRUD.Read:
          resEntities = <T[]>this.srv.get(getParams);
          res.status(200).json(resEntities);
          break;
      }
    } catch (error) {
      result = retError(error, 500, req.body);
      res.status(result.code).json(result);
    }
  }

  mapRoutesToEntity<T>(entityName: string): void {
    this.main.expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    this.main.expApp
      .route("/" + entityName)
      .get(async (req: Request, res: Response) =>
        this.runDml<T>(req, res, lstCRUD.Read)
      )
      .post(async (req: Request, res: Response) =>
        this.runDml<T>(req, res, lstCRUD.Create)
      );

    this.main.expApp
      .route("/" + entityName + "/:id")
      .get((req: Request, res: Response) => this.runDml(req, res, lstCRUD.Read))
      .put((req: Request, res: Response) =>
        this.runDml<T>(req, res, lstCRUD.Update)
      )
      .delete((req: Request, res: Response) =>
        this.runDml<T>(req, res, lstCRUD.Delete)
      );
  }
}
