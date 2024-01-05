"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const purchasesController_1 = __importDefault(require("./../controllers/purchasesController"));
class PurchasesRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.purchasesController = new purchasesController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.purchasesController.getAllPurchases);
        this.router.post("/", this.purchasesController.createPurchase);
        this.router.put("/:id", this.purchasesController.updatePurchase);
        this.router.delete("/:id", this.purchasesController.destroyPurchase);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = PurchasesRouter;
//# sourceMappingURL=purchases.js.map