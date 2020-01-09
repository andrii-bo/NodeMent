import { Request, Response, NextFunction } from "express";
import { myClassUserController } from "./classUserController";
import * as express from "express";


export class myClassRoutes {

    public userController: myClassUserController = new myClassUserController()

    public processRoutes(pApp: express.Application): void {

        pApp.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })

        pApp.route('/user')
            .get(this.userController.getUsers)
            .post(this.userController.addUser);

        pApp.route('/user/:id')
            .get(this.userController.getUsersById)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);

    }
}