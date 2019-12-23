import { userSchema } from 'defUser';
import { Request, Response } from 'express';

const Contact = userSchema;

interface iUser {
    id: string;
    login: string;
    password: string;
    age: string;
    isDeleted: string;
}


interface iUsers {
    [id: string]: iUser;
}

export class UserController{
    
    users: iUsers;
    
    public addUser (req: Request, res: Response) {                
    }

    public getUsersByPattern (req: Request, res: Response) {           
    }

    private async getById(req: Request, res: Response): Promise<void> {
        const bill = await billService.getById(req.params.id);
        res.send(bill ? 200 : 404, bill);
    } 
        
    public getUsersById (req: Request, res: Response) {    
        let user:iUser = this.users[req.params.id];      
        Contact.findById(req.params.contactId, (err, contact) => {
            if(err){
                res.send(err);
            }
            res.json(contact);
        });
    }

    public updateUser (req: Request, res: Response) {                   
    }

    public deleteUser (req: Request, res: Response) {                   
    }
    
}