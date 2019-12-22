import * as express from "express";
import { Routes } from "routes";

class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    
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
