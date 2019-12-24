import * as express from "express";
import { Routes } from "routes";
import { iUsers } from "defUser";
import { UserController } from "controller";

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public userController :UserController;
    
    constructor() {
        this.config();
        this.routePrv.routes(this.app);     
    }

    private config(): void{
        this.app.use(express.urlencoded({extended: true})); 
        this.app.use(express.json());   
    }

}

export default new App().app;
