"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersController_1 = __importDefault(require("./../controllers/usersController"));
class UserRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.usersController = new usersController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.usersController.getAllUsers.bind(this.usersController));
        this.router.get("/:id", this.usersController.getUserById.bind(this.usersController));
        this.router.get("/nickname/:nickname", this.usersController.getUserByNickname.bind(this.usersController));
        this.router.post("/", this.usersController.createUser.bind(this.usersController));
        this.router.put("/:id", this.usersController.editUserById.bind(this.usersController));
        this.router.delete("/:id", this.usersController.destroyUser.bind(this.usersController));
    }
    getRouter() {
        return this.router;
    }
}
exports.default = UserRouter;
//# sourceMappingURL=users.js.map