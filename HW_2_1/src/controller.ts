import { userSchema, iUsers, iUser } from 'defUser';
import { Request, Response } from 'express';

const Contact = userSchema;

export class UserController {

    private serial(data: iUser) {
        this.users[data.id] = data;
    }
    public users: iUsers;

    public addUser(req: Request, res: Response) {
        try {
            this.serial(<iUser>req.params);
        } catch (error) {
            res.send(error);
        }
    }

    public getUsersByPattern(req: Request, res: Response) {
    }


    public getUsersById(req: Request, res: Response) {
        try {
            let user: iUser = this.users[req.params.id];
            res.json(user);
        } catch (error) {
            res.send(error);
        }
    }

    public updateUser(req: Request, res: Response) {
    }

    public deleteUser(req: Request, res: Response) {
    }

}