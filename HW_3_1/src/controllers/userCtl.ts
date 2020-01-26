import express from "express";
import { Request, Response } from "express";
import { lstCRUD } from "../utils";
import { Controller } from "./controller";
import { UserSrv } from "../services/userSrv";

export class UserController implements Controller {
    private srv: UserSrv;
    constructor() {
        this.srv = new UserSrv;
    }

    public initialize(expApp: express.Application): void {
        expApp.route("/").get((req: Request, res: Response) => {
            res.status(200).send({ message: "GET request successfulll!" });
        });

        expApp
            .route("/user")
            .get((req: Request, res: Response) =>
                this.srv.dml(req, res, lstCRUD.Read)
            )
            .post((req: Request, res: Response) =>
                this.srv.dml(req, res, lstCRUD.Create)
            );

        expApp
            .route("/user/:id")
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
