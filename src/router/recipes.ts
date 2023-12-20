import express, { Request, Response, Router } from 'express';
import RecipesController from './../controllers/recipesController';

class RecipesRouter {
    private router: Router;
    private controller: RecipesController;

    constructor() {
        this.router = express.Router();
        this.controller = new RecipesController();
        this.setupRoutes();
    }

    private setupRoutes(): void {
        this.router.get('/', this.controller.getAllRecipes);
        this.router.get('/:id', this.controller.getRecipeById);
        this.router.post('/', this.controller.createRecipe);
        this.router.put('/:id', this.controller.editRecipe);
    }

    public getRouter(): Router {
        return this.router;
    }
}

export default RecipesRouter;
