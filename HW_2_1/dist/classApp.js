"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const classRoutes_1 = require("./classRoutes");
class myClassApp {
    constructor() {
        this.myRoutes = new classRoutes_1.myClassRoutes();
        this.myExprApp = express();
        this.myExprApp.use(express.json());
        this.myExprApp.use(express.urlencoded({ extended: true }));
        this.myRoutes.processRoutes(this.myExprApp);
    }
    serverStart(pPort) {
        this.myExprApp.listen(pPort, () => {
            console.log("  Press CTRL-C to stop\n");
        });
    }
}
exports.default = myClassApp;
//# sourceMappingURL=classApp.js.map