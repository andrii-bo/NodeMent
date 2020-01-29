import express from "express";
import { Request, Response } from "express";
import { DmlService } from "../services/dmlService";
import { iEntity } from "../models/entityMdl";
import { lstCRUD, iExecResult, iGetParams, retError } from "../utils";

export abstract class Controller {
  protected srv: DmlService;
  protected expApp: express.Application;
  protected entity: iEntity = {};
  constructor(expApp: express.Application, srv: DmlService) {
    this.expApp = expApp;
    this.srv = srv;
  }

  async runDml<T>(req: Request, res: Response, crudType: lstCRUD) {
    let result: iExecResult;
    let resEntity: iEntity;
    let resEntities: iEntity[];
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
          resEntity = <T>this.srv.add(this.entity);
          res.status(200).json(resEntity);
          break;
        case lstCRUD.Delete:
          this.srv.delete(getParams.id);
          res.status(200);
          break;
        case lstCRUD.Update:
          resEntity = <T>this.srv.update(this.entity, getParams.id);
          res.status(200).json(resEntity);
          break;
        case lstCRUD.Read:
          resEntities = <T[]>this.srv.get(this.entity, getParams);
          res.status(200).json(resEntities);
          break;
      }
    } catch (error) {
      result = retError(error, 500, req.body);
      res.status(result.code).json(result);
    }
  }

  mapRoutesToEntity<T>(entityName: string): void {
    this.expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    this.expApp
      .route("/" + entityName)
      .get(async (req: Request, res: Response) =>
        this.runDml<T>(req, res, lstCRUD.Read)
      )
      .post(async (req: Request, res: Response) =>
        this.runDml<T>(req, res, lstCRUD.Create)
      );

    this.expApp
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
