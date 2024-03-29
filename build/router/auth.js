"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const signInController_1 = __importDefault(require("./../controllers/signInController"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
class AuthRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.signInController = new signInController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.post("/", this.signInController.postAuth);
        this.router.get("/profile", authMiddleware_1.authMiddleware, this.signInController.getProfile);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = AuthRouter;
//# sourceMappingURL=auth.js.map