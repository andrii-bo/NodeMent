"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const classApp_1 = require("./classApp");
let myApp = new classApp_1.default();
const PORT = 3000;
const server = myApp.myExprApp.listen(PORT, () => {
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
//# sourceMappingURL=server.js.map