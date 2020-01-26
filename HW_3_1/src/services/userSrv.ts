import {DmlService} from './dmlService';
import { Request, Response } from "express";
import uuid from "uuid";
import { userSchema, IUser } from "../models/userMdl";
import Joi from '@hapi/joi';


export class UserSrv extends DmlService {

    private schemaValidation: Joi.ObjectSchema = userSchema;
   
     add(req: Request, res: Response) {
        let lId: string = uuid.v1();
        let lUser: IUser = <IUser>{};

        lUser = <IUser>req.body;
        lUser.isDeleted = false;
        lUser.id = lId;
        this.mergeUser(req, res, lUser, lId);
    }

    get(req: Request, res: Response) {
        let resUsers: IUser[] = [];
        let isLimit: boolean = false;
        let isFilter: boolean = false;
        let lSortUsers: IUser[] = [];
        isLimit = req.query["limit"];
        isFilter = req.query["filter"];

        for (let lKey in this.entities) {
            if (isFilter) {
                if (this.entities[lKey].login.includes(req.query["filter"])) lSortUsers.push(this.entities[lKey]);
            } else lSortUsers.push(this.entities[lKey]);
        }
        if (isLimit) lSortUsers.splice(req.query["limit"]);

        lSortUsers.sort((a, b) => {
            return a.login.localeCompare(b.login);
        });

        if (this.is_key_id) {
            resUsers.push(this.keyEntity);
        } else {
            resUsers = lSortUsers;
        };

        res.json(resUsers);
    }

    update(req: Request, res: Response) {
        this.mergeUser(req, res, <IUser>req.body, this.key_id);
    }

    mergeUser(req: Request, res: Response, pUser: IUser, pId: string) {
        let validateRes: Joi.ValidationResult;
        validateRes = this.schemaValidation.validate(pUser);
        if (validateRes.error) {
            res.status(400).send({ "message": "New User validation fail", "error": validateRes.error });
        } else {
            this.entities[pId] = pUser;
            this.key_id = pId;
            this.keyEntity = pUser;
            res.json({ message: "User successfully added!", "validatedRes": validateRes });
        }
    }

    delete(req: Request, res: Response) {
        this.entities[this.key_id].isDeleted = false;
    }
}