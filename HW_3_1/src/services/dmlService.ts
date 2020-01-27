import { Request, Response } from "express";
import { lstCRUD, handleError } from "../utils";
import { IEntity } from "../models/entityMdl";
import { DatabaseProvider } from '../database/index';

export abstract class DmlService {
    abstract add(req: Request, res: Response): void;
    abstract get(req: Request, res: Response): void;
    abstract update(req: Request, res: Response): void;
    abstract delete(req: Request, res: Response): void;
    protected key_id: string;
    protected keyEntity: IEntity;
    protected is_key_id: boolean = false;
    public entities: IEntity = <IEntity>{};
    protected db: DatabaseProvider;

    public dml(req: Request, res: Response, op: lstCRUD) {
        try {
            if (req.params["id"]) {
                this.key_id = req.params["id"];
                this.keyEntity = this.entities[this.key_id];
                this.is_key_id = true;
            };
            console.log({ operation: op });
            switch (op) {
                case lstCRUD.Create:
                    this.add(req, res);
                    break;
                case lstCRUD.Delete:
                    this.delete(req, res);
                    break;
                case lstCRUD.Update:
                    this.update(req, res);
                    break;
                case lstCRUD.Read:
                    this.get(req, res);
                    break;
            }
        } catch (error) {
            res.json(handleError(error, "500", req.body));
        }
    }
} 