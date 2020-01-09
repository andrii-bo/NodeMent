import { userSchema, iUsers, iUser } from "./defUser";
import { Request, Response } from "express";
import uuid from "uuid";

const Contact = userSchema;

export class myClassUserController {
  private serial(data: iUser) {
    this.users[data.id] = data;
  }

  public users: iUsers;

  public addUser(req: Request, res: Response) {
    try {
      let lId: string = uuid.v1();
      let lUser: iUser = req.body;
      lUser.isDeleted = false;
      lUser.id = lId;
      this.users[lId] = lUser;
      console.log(lUser);
      res.json({ message: "User successfully added!", lUser });
    } catch (error) {
      res.send(error);
    }
  }

  public getUsers(req: Request, res: Response) {
    try {
      console.log("getUsers: %j", req.query);
      let resUsers: iUsers;
      for (let lKey in this.users) {
        resUsers[lKey] = this.users[lKey];
      };
     res.send({ message: 'GET request successfulll!!!!' })     
    } catch (error) {
      console.log(error);
      res.send({ error: "sany" });
    }
  }

  public getUsersById(req: Request, res: Response) {
    try {
      let user: iUser = this.users[req.body.id];
      res.json(user);
    } catch (error) {
      res.send(error);
    }
  }

  public updateUser(req: Request, res: Response) {
    try {
      this.serial(<iUser>req.body);
    } catch (error) {
      res.send(error);
    }
  }

  public deleteUser(req: Request, res: Response) {
    try {
      this.users[req.body.id].isDeleted = false;
    } catch (error) {
      res.send(error);
    }
  }
}
