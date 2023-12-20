"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productsController_1 = __importDefault(require("./../controllers/productsController"));
class ProductsRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.productsController = new productsController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get("/", this.productsController.getAllProducts);
        this.router.get("/:id", this.productsController.getProductById);
        this.router.post("/", this.productsController.createProduct);
        this.router.put("/:id", this.productsController.updateProduct);
        this.router.delete("/:id", this.productsController.destroyProduct);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = ProductsRouter;
//# sourceMappingURL=products.js.map