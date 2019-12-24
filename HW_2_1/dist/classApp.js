"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const routes_1 = require("./routes");
class App {
    constructor() {
        this.app = express();
        this.routePrv = new routes_1.Routes();
        this.app;
        this.config();
        this.routePrv.routes(this.app);
    }
    config() {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }
}
exports.default = App;
//# sourceMappingURL=classApp.js.map