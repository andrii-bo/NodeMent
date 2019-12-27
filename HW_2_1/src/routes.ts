import {Request, Response, NextFunction} from "express";
import { userController } from "./controller";

export class Routes { 
    
    public userController: userController = new userController() 
    
    public routes(app): void {   
        
        app.route('/')
        .get((req: Request, res: Response) => {            
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            })
        })
        
        app.route('/user')
        .get((req: Request, res: Response, next: NextFunction) => {
            res.status(200).send({
                message: `${req.body}`
            });
            console.log(`Request type: ${req.body}`);            
                next();
        }, this.userController.addUser)        

        // POST endpoint
        .post(this.userController.addUser);
       
        app.route('/user/:userId')
        // get specific contact
        .get(this.userController.getUsersById)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

    }
}