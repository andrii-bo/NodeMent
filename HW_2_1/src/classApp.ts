import * as express from "express";
import { myClassRoutes } from "./classRoutes";
import { myClassUserController } from "./classUserController";

export default class myClassApp {

    public myExprApp: express.Application = express();
    public myRoutes: myClassRoutes = new myClassRoutes();
    public myController :myClassUserController;
    
    constructor() {
        this.myExprApp;
        this.myExprApp.use(express.json());           
        this.myExprApp.use(express.urlencoded({extended: true})); 
        this.myRoutes.processRoutes(this.myExprApp);     
    }

}

/*
class App {

    public app: express.Application = express();
    public routePrv: Routes = new Routes();
    public mongoUrl: string = 'mongodb://dalenguyen:123123@localhost:27017/CRMdb';

    constructor() {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(express.static('public'));
        mongoose.Promise = global.Promise;
        mongoose.connect(this.mongoUrl, {useNewUrlParser: true});        
        this.routePrv.routes(this.app);     
    }


}

export default new App().app;
*/