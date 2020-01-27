import express from "express";
import { Request, Response } from "express";
import { DatabaseProvider } from "../database/index";
import { DmlService } from "services/dmlService";
import { lstCRUD } from "../utils";

export abstract class Controller {
  protected db: DatabaseProvider;
  protected srv: DmlService;
  protected expApp: express.Application;
  constructor(expApp: express.Application, db: DatabaseProvider, srv: any) {
    this.db = db;
    this.expApp = expApp;
    this.srv = srv;
  }

  mapRoutesToEntity(entityName: string): void {
    this.expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfulll!" });
    });

    this.expApp
      .route("/" + entityName)
      .get((req: Request, res: Response) =>
        this.srv.dml(req, res, lstCRUD.Read)
      )
      .post((req: Request, res: Response) =>
        this.srv.dml(req, res, lstCRUD.Create)
      );

    this.expApp
      .route("/" + entityName + "/:id")
      .get((req: Request, res: Response) =>
        this.srv.dml(req, res, lstCRUD.Read)
      )
      .put((req: Request, res: Response) =>
        this.srv.dml(req, res, lstCRUD.Update)
      )
      .delete((req: Request, res: Response) =>
        this.srv.dml(req, res, lstCRUD.Delete)
      );
  }
}
