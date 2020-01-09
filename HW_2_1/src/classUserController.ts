import { userSchema, iUsers, iUser } from "./defUser";
import { Request, Response } from "express";
import uuid from "uuid";
import handleError from "./utils";

const Contact = userSchema;

export class myClassUserController {
  private serial(data: iUser) {
    this.users[data.id] = data;
  }

  public users: iUsers;

  public addUser(req: Request, res: Response) {
    let lId: string = uuid.v1();
    let lUser: iUser = req.body;
    lUser.isDeleted = false;
    lUser.id = lId;
    this.users[lId] = lUser;
    res.json({ message: "User successfully added!", lUser });
  }

  public getUsers(req: Request, res: Response) {
    try {
      let resUsers: iUsers;
      for (let lKey in this.users) {
        resUsers[lKey] = this.users[lKey];
      }
      res.send({ message: "GET request successfulll!!!!" });
    } catch (error) {
      res.send(handleError(error, "500", req.body));
    }
  }

  public getUsersById(req: Request, res: Response) {
    let user: iUser = this.users[req.body.id];
    res.json(user);
  }

  public updateUser(req: Request, res: Response) {
    this.serial(<iUser>req.body);
  }

  public deleteUser(req: Request, res: Response) {
    this.users[req.body.id].isDeleted = false;
  }
}
