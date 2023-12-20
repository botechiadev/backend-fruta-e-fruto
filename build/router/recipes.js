"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const recipesController_1 = __importDefault(require("./../controllers/recipesController"));
class RecipesRouter {
    constructor() {
        this.router = express_1.default.Router();
        this.controller = new recipesController_1.default();
        this.setupRoutes();
    }
    setupRoutes() {
        this.router.get('/', this.controller.getAllRecipes);
        this.router.get('/:id', this.controller.getRecipeById);
        this.router.post('/', this.controller.createRecipe);
        this.router.put('/:id', this.controller.editRecipe);
    }
    getRouter() {
        return this.router;
    }
}
exports.default = RecipesRouter;
//# sourceMappingURL=recipes.js.map