"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("./controller");
class Routes {
    constructor() {
        this.userController = new controller_1.userController();
    }
    routes(app) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/user')
            .get((req, res, next) => {
            res.status(200).send({
                message: `${req.body}`
            });
            console.log(`Request type: ${req.body}`);
            next();
        }, this.userController.addUser)
            // POST endpoint
            .post(this.userController.addUser);
        app.route('/user/:userId')
            // get specific contact
            .get(this.userController.getUsersById)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map