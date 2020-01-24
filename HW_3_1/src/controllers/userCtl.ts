import express from "express";
import { Request, Response } from "express";
import { handleError, lstCRUD } from "../utils";
import Joi from '@hapi/joi';

const Contact = userSchema;

export class UserController {

    public users: iUsers = <iUsers>{};
    private key_id: string;    
    private keyUser: iUser;
    private schemaValidation: Joi.ObjectSchema = userSchema;
    private is_key_id: boolean = false;

    public initialize(expApp: express.Application): void {
        expApp.route("/").get((req: Request, res: Response) => {
            res.status(200).send({ message: "GET request successfulll!" });
        });

        expApp
            .route("/user")
            .get((req: Request, res: Response) =>
                this.dmlUser(req, res, lstCRUD.Read)
            )
            .post((req: Request, res: Response) =>
                this.dmlUser(req, res, lstCRUD.Create)
            );

        expApp
            .route("/user/:id")
            .get((req: Request, res: Response) =>
                this.dmlUser(req, res, lstCRUD.Read)
            )
            .put((req: Request, res: Response) =>
                this.dmlUser(req, res, lstCRUD.Update)
            )
            .delete((req: Request, res: Response) =>
                this.dmlUser(req, res, lstCRUD.Delete)
            );

    }

    public dmlUser(req: Request, res: Response, op: lstCRUD) {
        try {
            if (req.params["id"]) {
                this.is_key_id = true;
                this.key_id = req.params["id"];
                this.keyUser = this.users[this.key_id];
            };
            console.log({ operation: op });
            switch (op) {
                case lstCRUD.Create:
                    this.addUser(req, res);
                    break;
                case lstCRUD.Delete:
                    this.deleteUser(req, res);
                    break;
                case lstCRUD.Update:
                    this.updateUser(req, res);
                    break;
                case lstCRUD.Read:
                    this.getUsers(req, res);
                    break;
            }
        } catch (error) {
            res.json(handleError(error, "500", req.body));
        }
    }

    
}
