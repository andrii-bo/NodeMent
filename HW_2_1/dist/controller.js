"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const defUser_1 = require("./defUser");
const Contact = defUser_1.userSchema;
class userController {
    serial(data) {
        this.users[data.id] = data;
    }
    addUser(req, res) {
        try {
            this.serial(req.body);
        }
        catch (error) {
            res.send(error);
        }
    }
    getUsersByPattern(req, res) {
    }
    getUsersById(req, res) {
        try {
            let user = this.users[req.body.id];
            res.json(user);
        }
        catch (error) {
            res.send(error);
        }
    }
    updateUser(req, res) {
    }
    deleteUser(req, res) {
    }
}
exports.userController = userController;
//# sourceMappingURL=controller.js.map