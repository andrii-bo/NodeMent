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

  private async runDml(req: Request, res: Response, crudType: lstCRUD) {
    let result: iExecResult;
    //result.request = <string>req.body;
    try {
      let getParams: iGetParams = {};
      getParams.id = req.params["id"];
      getParams.filter = req.query["filter"];
      getParams.limit = req.query["limit"];
      getParams.entity = req.body;
      getParams.crudOp = crudType;
      print_info("PARAMS", getParams);

      switch (crudType) {
        case lstCRUD.Delete:
          await this.srv
            .delete(getParams.id)
            .then(value => (result = value))
            .catch(err => (result = retError(400, err)));
          break;
        case lstCRUD.Update:
          console.log("acion id ",getParams.id);
          await this.srv
            .merge(getParams)
            .then(value => (result = value))
            .catch(err => (result = retError(400, err)));
          break;
        case lstCRUD.Read:
          await this.srv.get(getParams)
            .then(
              value => {
                print_info("record count", value.result.length);
                result = value;
              },
              reason => {
                print_info("users not found ERROR", reason);
                result = retError(500, reason, req.body);
              }
            );
          break;
      }
      res.status(result.code).json(result.result);
    } catch (error) {
      result = retError(error, 500, req.body);
      res.status(result.code).json(result);
    }
  }

  protected mapRoutesToEntity(routeName: string, expApp: express.Application) {
    expApp.route("/").get((req: Request, res: Response) => {
      res.status(200).send({ message: "GET request successfull!" });
    });

    expApp
      .route("/" + routeName)
      .get(async (req: Request, res: Response) => {
        await this.runDml(req, res, lstCRUD.Read);
      })
      .post(async (req: Request, res: Response) => {
        await this.runDml(req, res, lstCRUD.Update);
      });

    expApp
      .route("/" + routeName + "/:id")
      .get(async (req: Request, res: Response) => await this.runDml(req, res, lstCRUD.Read))
      .put(
        async (req: Request, res: Response) =>
          await this.runDml(req, res, lstCRUD.Update)
      )
      .delete(
        async (req: Request, res: Response) =>
          await this.runDml(req, res, lstCRUD.Delete)
      );
  }
}
