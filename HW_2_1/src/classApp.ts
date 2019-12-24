import * as express from "express";
import { Routes } from "./routes";
import { userController } from "./controller";

export default class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public userController :userController;
    
    constructor() {
        this.app
        this.config();
        this.routePrv.routes(this.app);     
    }

    private config(): void{
        this.app.use(express.urlencoded({extended: true})); 
        this.app.use(express.json());   
    }

}


