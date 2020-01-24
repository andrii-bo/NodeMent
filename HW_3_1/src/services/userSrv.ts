import {dmlEntity} from './entityCRUD';
import { Request, Response } from "express";
import uuid from "uuid";
import { userSchema, iUsers, iUser } from "../models/userMdl";

class userSrv extends dmlEntity {
    add(req: Request, res: Response) {
        let lId: string = uuid.v1();
        let lUser: iUser = <iUser>{};

        lUser = <iUser>req.body;
        lUser.isDeleted = false;
        lUser.id = lId;
        this.assignNewUser(req, res, lUser, lId);
    }

    get(req: Request, res: Response) {
        let resUsers: iUser[] = [];
        let isLimit: boolean = false;
        let isFilter: boolean = false;
        let lSortUsers: iUser[] = [];
        isLimit = req.query["limit"];
        isFilter = req.query["filter"];

        for (let lKey in this.users) {
            if (isFilter) {
                if (this.users[lKey].login.includes(req.query["filter"])) lSortUsers.push(this.users[lKey]);
            } else lSortUsers.push(this.users[lKey]);
        }
        if (isLimit) lSortUsers.splice(req.query["limit"]);

        lSortUsers.sort((a, b) => {
            return a.login.localeCompare(b.login);
        });

        if (this.is_key_id) {
            resUsers.push(this.keyUser);
        } else {
            resUsers = lSortUsers;
        };

        res.json(resUsers);
    }

    update(req: Request, res: Response) {
        this.assignNewUser(req, res, <iUser>req.body, this.key_id);
    }

    private assignNewUser(req: Request, res: Response, pUser: iUser, pId: string) {
        let validateRes: Joi.ValidationResult;
        validateRes = this.schemaValidation.validate(pUser);
        if (validateRes.error) {
            res.status(400).send({ "message": "New User validation fail", "error": validateRes.error });
        } else {
            this.users[pId] = pUser;
            this.key_id = pId;
            this.keyUser = pUser;
            res.json({ message: "User successfully added!", "validatedRes": validateRes });
        }
    }

    delete(req: Request, res: Response) {
        this.users[this.key_id].isDeleted = false;
    }
}