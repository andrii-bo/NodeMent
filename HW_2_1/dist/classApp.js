"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const classRoutes_1 = require("./classRoutes");
class myClassApp {
    constructor() {
        this.myExprApp = express();
        this.myRoutes = new classRoutes_1.myClassRoutes();
        this.myExprApp;
        this.myExprApp.use(express.json());
        this.myExprApp.use(express.urlencoded({ extended: true }));
        this.myRoutes.processRoutes(this.myExprApp);
    }
}
exports.default = myClassApp;
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
//# sourceMappingURL=classApp.js.map