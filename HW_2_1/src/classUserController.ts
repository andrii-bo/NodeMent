import { userSchema, iUsers, iUser } from "./defUser";
import { Request, Response } from "express";
import uuid from "uuid";
import { handleError, lstCRUD } from "./utils";

const Contact = userSchema;

export class myClassUserController {
  private serial(pUser: iUser, pId: string) {
    this.users[pId] = pUser;
  }

  public users: iUsers = <iUsers>{};

  public dmlUser(req: Request, res: Response, op: lstCRUD) {
    try {
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
      res.send(handleError(error, "500", req.body));
    }
  }

  private addUser(req: Request, res: Response) {
    let lId: string = uuid.v1();
    let lUser: iUser = <iUser>{};
    lUser.age = req.body.age;
    lUser.login = req.body.login;
    lUser.password = req.body.password;
    lUser.isDeleted = false;
    lUser.id = lId;
    console.log({ request: req.body });
    console.log({ added_user: lUser });
    this.users[lId] = lUser;
    res.json({ message: "User successfully added!", result: lUser });
  }

  private getUsers(req: Request, res: Response) {
    let resUsers: iUsers = <iUsers>{};
    let id: string;
    let isLimit: boolean=false;
    let isFilter: boolean=false;
    console.log({ query: req.query });
    console.log({ params: req.params });
    isLimit=req.query["limit"];
    isFilter=req.query["filter"];
    if (req.params["id"]) {
      if (isLimit OR) {
        limit = req.query.limit;
      } else {
        id = req.params["id"];
        resUsers[id] = this.users[id];
      }
    } else {
      for (let lKey in this.users) {
        resUsers[lKey] = this.users[lKey];
      }
    }
    res.json(resUsers);
  }

  private getUsersById(req: Request, res: Response) {
    let user: iUser = this.users[req.body.id];
    res.json(user);
  }

  private updateUser(req: Request, res: Response) {
    this.serial(<iUser>req.body, req.body.id);
  }

  private deleteUser(req: Request, res: Response) {
    this.users[req.body.id].isDeleted = false;
  }
}
