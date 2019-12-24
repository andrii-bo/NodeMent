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
        
        // Contact 
        app.route('/contact')
        .get((req: Request, res: Response, next: NextFunction) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);            
            if(req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e'){
                res.status(401).send('You shall not pass!');
            } else {
                next();
            }                        
        }, this.userController.addUser)        

        // POST endpoint
        .post(this.userController.addUser);

        // Contact detail
        app.route('/contact/:contactId')
        // get specific contact
        .get(this.userController.getUsersById)
        .put(this.userController.updateUser)
        .delete(this.userController.deleteUser)

    }
}