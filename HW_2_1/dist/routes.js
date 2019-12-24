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
        // Contact 
        app.route('/contact')
            .get((req, res, next) => {
            // middleware
            console.log(`Request from: ${req.originalUrl}`);
            console.log(`Request type: ${req.method}`);
            if (req.query.key !== '78942ef2c1c98bf10fca09c808d718fa3734703e') {
                res.status(401).send('You shall not pass!');
            }
            else {
                next();
            }
        }, this.userController.addUser)
            // POST endpoint
            .post(this.userController.addUser);
        // Contact detail
        app.route('/contact/:contactId')
            // get specific contact
            .get(this.userController.getUsersById)
            .put(this.userController.updateUser)
            .delete(this.userController.deleteUser);
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map